package com.seproject.Bookface.post;


import com.seproject.Bookface.post.dao.PostEntity;
import com.seproject.Bookface.post.dto.request.CreatePostRequest;
import com.seproject.Bookface.post.dto.response.AllPostsFromUserResponse;

import java.util.Optional;

public interface PostService {

    void addPost(CreatePostRequest requestBody);

    void removePost(Long postId);

    Optional<PostEntity> findPost(Long postId);

    Optional<PostEntity> modifyPost(Long postId, String title, String content);

    AllPostsFromUserResponse findAllPostsFromUser(String userId);

}
