package com.seproject.Bookface.post;

import com.seproject.Bookface.post.dao.PostEntity;
import com.seproject.Bookface.post.dto.request.CreatePostRequest;
import com.seproject.Bookface.post.dto.response.AllPostsFromUserResponse;
import com.seproject.Bookface.user.dto.response.MeResponse;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.Optional;

@Service
public class PostServiceImpl implements PostService {

    private final PostRepository postRepository;

    public PostServiceImpl(PostRepository postRepository) {
        this.postRepository = postRepository;
    }

    @Override
    public void addPost(CreatePostRequest requestBody) {
        MeResponse me = (MeResponse) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String userId = me.getUserId();

        postRepository.save(PostEntity.builder()
                .userId(userId)
                .title(requestBody.getTitle())
                .content(requestBody.getContent())
                .timestamp(Timestamp.valueOf(LocalDateTime.now()))
                .build());
    }

    @Override
    public void removePost(Long postId) {
        postRepository.deleteById(postId);
    }

    @Override
    public Optional<PostEntity> modifyPost(Long postId, String title, String content) {
        postRepository.setUserInfoById(postId, title, content);

        return postRepository.findById(postId);
    }

    @Override
    public Optional<PostEntity> findPost(Long postId) {
        return postRepository.findById(postId);
    }

    @Override
    public AllPostsFromUserResponse findAllPostsFromUser(String userId) {
        AllPostsFromUserResponse allPosts = new AllPostsFromUserResponse(postRepository.findAllByUserId(userId));
        return allPosts;
    }
}
