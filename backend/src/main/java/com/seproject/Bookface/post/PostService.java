package com.seproject.Bookface.post;


import com.seproject.Bookface.post.dao.PostData;
import com.seproject.Bookface.post.dto.request.CreatePostRequest;
import com.seproject.Bookface.post.dto.response.PostsResponseDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

public interface PostService {

    ResponseEntity<String> addPost(CreatePostRequest requestBody, String userId);

    ResponseEntity<String> removePost(String postId, String userId);

    ResponseEntity<PostData> getPost(String userId, String postId);

    ResponseEntity<String> modifyPost(String postId, String title, String content, String userId);

    PostsResponseDto findAllPostsFromUser(String userId, Pageable paging);

    PostsResponseDto findAllPostsFromFriends(Pageable paging);

}
