package com.seproject.Bookface.post;

import com.cloudinary.Cloudinary;
import com.seproject.Bookface.feedback.comment.CommentRepository;
import com.seproject.Bookface.feedback.reaction.Choice;
import com.seproject.Bookface.feedback.reaction.ReactionRepository;
import com.seproject.Bookface.feedback.reaction.dto.response.ReactionDto;
import com.seproject.Bookface.friend.FriendServiceImpl;
import com.seproject.Bookface.friend.dao.FriendshipEntity;
import com.seproject.Bookface.friend.dto.response.AllFriendsResponse;
import com.seproject.Bookface.post.dao.PostData;
import com.seproject.Bookface.post.dto.request.CreatePostRequest;
import com.seproject.Bookface.post.dto.response.PostDto;
import com.seproject.Bookface.post.dto.response.PostsResponseDto;
import com.seproject.Bookface.user.UserServiceImpl;
import com.seproject.Bookface.user.dto.response.MeResponse;
import com.seproject.Bookface.user.dto.response.ReturnedUser;
import com.seproject.Bookface.utils.cloudinary.CloudinaryServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import javax.transaction.Transactional;
import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.*;

@Service
@RequiredArgsConstructor
@Slf4j
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;
    private final FriendServiceImpl friendService;
    private final CommentRepository commentRepository;
    private final ReactionRepository reactionRepository;
    private final CloudinaryServiceImpl cloudinaryService;
    private final Cloudinary cloudinary;
    private final UserServiceImpl userService;

    @Override
    public ResponseEntity<String> addPost(CreatePostRequest requestBody, MultipartFile file) {
        MeResponse me = (MeResponse) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = me.getUserId();

        String cloudUrl = cloudinary.url().secure(true).format("jpg")
                .publicId(cloudinaryService.upload(file))
                .generate();

            postRepository.save(PostData.builder()
                    .userId(userId)
                    .title(requestBody.getTitle())
                    .content(requestBody.getContent())
                    .timestamp(Timestamp.valueOf(LocalDateTime.now()))
                    .imageUrl(cloudUrl)
                    .build());
            return new ResponseEntity<>("{\"message\": \"Post successfully added\"}", HttpStatus.OK);
        }

    @Override
    @Transactional
    public ResponseEntity<String> removePost(String postId) {
            if (postRepository.existsById(postId)) {
                postRepository.deleteById(postId);
                reactionRepository.deleteAllByPostId(postId);
                commentRepository.deleteAllByPostId(postId);
                return new ResponseEntity<>("{\"message\": \"Post successfully deleted\"}", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("{\"message\": \"Post not found\"}", HttpStatus.BAD_REQUEST);
            }
        }

    @Override
    public ResponseEntity<String> modifyPost(String postId, String title, String content) {
            if (postRepository.existsById(postId)) {
                postRepository.setUserInfoById(postId, title, content);
                return new ResponseEntity<>("{\"message\": \"Post successfully modified\"}", HttpStatus.OK);
            } else {
                return new ResponseEntity<>("{\"message\": \"Post not found\"}", HttpStatus.BAD_REQUEST);
            }
        }

    @Override
    public ResponseEntity<PostDto> getPost(String postId) {
        if (postRepository.existsById(postId)) {
            MeResponse me = (MeResponse) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
            String userId = me.getUserId();

            PostData post = postRepository.getPostEntityByPostId(postId);
            Map<PostData, List<ReactionDto>> postDataMap = new HashMap<>();

            postDataMap.put(post, new ArrayList<ReactionDto>());
            for (Choice choice : Choice.values()) {
                postDataMap.get(post).add(new ReactionDto(choice, reactionRepository.getAllByPostIdAndChoice(post.getPostId(), choice).size()));
            }

            Choice userChoice = null;
            if (reactionRepository.getReactionEntityByPostIdAndUserId(post.getPostId(), userId) != null
                    && reactionRepository.getReactionEntityByPostIdAndUserId(post.getPostId(), userId).getChoice() != null) {
                userChoice = reactionRepository.getReactionEntityByPostIdAndUserId(post.getPostId(), userId).getChoice();
            }

            return new ResponseEntity<>(PostDto.builder()
                    .postData(post)
                    .comments(commentRepository.countAllByPostId(post.getPostId()))
                    .reactions(postDataMap.get(post))
                    .choice(userChoice)
                    .user(userService.getUser(post.getUserId()).getBody().getUser())
                    .build(), HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<PostsResponseDto> findAllPostsFromUser(String userId, Pageable paging) {
        List<PostData> postDataPage = postRepository.findAllByUserIdOrderByTimestampDesc(userId, paging).getContent();

        return ResponseEntity.ok()
                .body(createPostDto(postDataPage));
    }

    @Override
    public PostsResponseDto findAllPostsFromFriends(Pageable paging) {
        MeResponse me = (MeResponse) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = me.getUserId();

        AllFriendsResponse allFriends = friendService.getAllFriendsOf(userId);
        List<String> friendIds = new ArrayList<>();
        for (FriendshipEntity friendship : allFriends.getFriendships()) {
            friendIds.add(friendship.getUserId());
        }

        List<PostData> postDataPage = postRepository.findAllByUserIdInOrderByTimestampDesc(friendIds, paging).getContent();
        return createPostDto(postDataPage);
    }

    private PostsResponseDto createPostDto(List<PostData> postDataPage) {
        List<PostDto> postDtoList = new ArrayList<>();
        Map<PostData, List<ReactionDto>> postDataMap = new HashMap<>();

        MeResponse me = (MeResponse) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = me.getUserId();

        Choice userChoice = null;

        for (PostData post : postDataPage) {
            postDataMap.put(post, new ArrayList<ReactionDto>());
            for (Choice choice : Choice.values()) {
                postDataMap.get(post).add(new ReactionDto(choice, reactionRepository.getAllByPostIdAndChoice(post.getPostId(), choice).size()));
            }

            if (reactionRepository.getReactionEntityByPostIdAndUserId(post.getPostId(), userId) != null
                        && reactionRepository.getReactionEntityByPostIdAndUserId(post.getPostId(), userId).getChoice() != null) {
                userChoice = reactionRepository.getReactionEntityByPostIdAndUserId(post.getPostId(), userId).getChoice();
                }

            PostDto postDto = PostDto.builder()
                    .postData(post)
                    .comments(commentRepository.countAllByPostId(post.getPostId()))
                    .reactions(postDataMap.get(post))
                    .choice(userChoice)
                    .user(userService.getUser(post.getUserId()).getBody().getUser())
                    .build();

            postDtoList.add(postDto);
        }

        return new PostsResponseDto(postDtoList);
    }

}
