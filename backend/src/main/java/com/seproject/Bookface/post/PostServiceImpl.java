package com.seproject.Bookface.post;

import com.seproject.Bookface.post.dao.PostEntity;
import com.seproject.Bookface.post.dto.request.CreatePostRequest;
import com.seproject.Bookface.post.dto.response.PostsResponse;
import com.seproject.Bookface.user.dto.response.MeResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Objects;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

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
    public PostsResponse findAllPostsFromUser(String userId, Pageable paging) {
        PostsResponse allPosts = new PostsResponse(postRepository
                .findAllByUserIdOrderByTimestampDesc(userId, paging).getContent());
        return allPosts;
    }
}
