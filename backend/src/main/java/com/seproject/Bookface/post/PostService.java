package com.seproject.Bookface.post;


import com.seproject.Bookface.post.dao.PostEntity;
import com.seproject.Bookface.post.dto.request.CreatePostRequest;
import com.seproject.Bookface.post.dto.response.PostsResponse;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface PostService {

    ResponseEntity<String> addPost(CreatePostRequest requestBody, String userId);

    ResponseEntity<String> removePost(String postId, String userId);

    ResponseEntity<PostEntity> getPost(String userId, String postId);

    ResponseEntity<String> modifyPost(String postId, String title, String content, String userId);

    PostsResponse findAllPostsFromUser(String userId, Pageable paging);

}
