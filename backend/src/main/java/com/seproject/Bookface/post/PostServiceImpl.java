package com.seproject.Bookface.post;

import com.seproject.Bookface.feedback.comment.CommentRepository;
import com.seproject.Bookface.feedback.reaction.Choice;
import com.seproject.Bookface.feedback.reaction.ReactionRepository;
import com.seproject.Bookface.feedback.reaction.dto.response.ReactionDto;
import com.seproject.Bookface.friend.FriendServiceImpl;
import com.seproject.Bookface.friend.dao.FriendshipEntity;
import com.seproject.Bookface.friend.dto.response.AllFriendsResponse;
import com.seproject.Bookface.post.dao.PostEntity;
import com.seproject.Bookface.post.dto.request.CreatePostRequest;
import com.seproject.Bookface.post.dto.response.PostDto;
import com.seproject.Bookface.post.dto.response.PostsResponseDto;
import com.seproject.Bookface.user.dto.response.MeResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;
import java.util.Objects;

@Service
@RequiredArgsConstructor
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final FriendServiceImpl friendService;
    private final CommentRepository commentRepository;
    private final ReactionRepository reactionRepository;

    @Override
    public ResponseEntity<String> addPost(CreatePostRequest requestBody, String userId) {
        MeResponse me = (MeResponse) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String auth = me.getUserId();

        if (Objects.equals(userId, auth)) {
            postRepository.save(PostEntity.builder()
                    .userId(userId)
                    .title(requestBody.getTitle())
                    .content(requestBody.getContent())
                    .timestamp(Timestamp.valueOf(LocalDateTime.now()))
                    .build());
            return new ResponseEntity<>("Post successfully added", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Unauthorized access", HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public ResponseEntity<String> removePost(String postId, String userId) {
        MeResponse me = (MeResponse) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String auth = me.getUserId();

        if (Objects.equals(userId, auth)) {
            if (postRepository.existsById(postId)) {
                postRepository.deleteById(postId);
                return new ResponseEntity<>("Post successfully deleted", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Post not found", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Unauthorized access", HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public ResponseEntity<String> modifyPost(String postId, String title, String content, String userId) {
        MeResponse me = (MeResponse) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String auth = me.getUserId();

        if (Objects.equals(userId, auth)) {
            if (postRepository.existsById(postId)) {
                postRepository.setUserInfoById(postId, title, content);
                return new ResponseEntity<>("Post successfully modified", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("Post not found", HttpStatus.BAD_REQUEST);
            }
        } else {
            return new ResponseEntity<>("Unauthorized access", HttpStatus.UNAUTHORIZED);
        }
    }

    @Override
    public ResponseEntity<PostEntity> getPost(String userId, String postId) {
        if (postRepository.existsById(postId)) {
            if (Objects.equals(postRepository.getPostEntityByPostId(postId).getUserId(), userId)) {
                return new ResponseEntity<>(postRepository.getPostEntityByPostId(postId), HttpStatus.OK);
            }
        }
        return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
    }

    @Override
    public PostsResponseDto findAllPostsFromUser(String userId, Pageable paging) {
        List<PostEntity> postEntityPage = postRepository.findAllByUserIdOrderByTimestampDesc(userId, paging).getContent();
        return createPostDto(postEntityPage);
    }

    @Override
    public PostsResponseDto findAllPostsFromFriends(String userId, Pageable paging) {
        AllFriendsResponse allFriends = friendService.getAllFriendsOf(userId);
        List<String> friendIds = new ArrayList<>();
        for (FriendshipEntity friendship : allFriends.getFriendships()) {
            friendIds.add(friendship.getUserId());
        }

        List<PostEntity> postEntityPage = postRepository.findAllByUserIdIn(friendIds, paging).getContent();
        return createPostDto(postEntityPage);
    }

    private PostsResponseDto createPostDto(List<PostEntity> postEntityPage) {
        List<PostDto> postDtoList = new ArrayList<>();
        List<ReactionDto> reactionDtoList = new ArrayList<>();

        for (PostEntity post : postEntityPage) {
            reactionDtoList.clear();

            for (Choice choice : Choice.values()) {
                reactionDtoList.add(new ReactionDto(choice, reactionRepository.countAllByPostIdAndChoice(post, choice)));
            }

            postDtoList.add(PostDto.builder()
                    .postEntity(post)
                    .comments(commentRepository.countAllByPostId(post))
                    .reactions(reactionDtoList)
                    .build());
        }

        return new PostsResponseDto(postDtoList);
    }

}
