package com.seproject.Bookface.post;

import com.seproject.Bookface.post.dao.PostEntity;
import com.seproject.Bookface.post.dto.request.CreatePostRequest;
import com.seproject.Bookface.post.dto.response.AllPostsFromUserResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.Optional;

@RestController
@RequestMapping(path = "/user/post")
@Slf4j
public class PostController {

    private final PostServiceImpl postServiceImpl;

    public PostController(PostServiceImpl postService) {
        this.postServiceImpl = postService;
    }

    @PostMapping(path = "/add", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addPost(@RequestBody CreatePostRequest requestBody) {
        try {
            postServiceImpl.addPost(requestBody);
            log.info("Post succesfully added");
            return new ResponseEntity<>("Post succesfully added", HttpStatus.CREATED);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @DeleteMapping(path = "/{postId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deletePost(@PathVariable Long postId) {
        try {
            postServiceImpl.removePost(postId);
            log.info("Post succesfully removed");
            return new ResponseEntity<>("Post succesfully removed", HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @PutMapping(path = "/{postId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<Optional<PostEntity>> modifyPost(@PathVariable Long postId,
                                                           @RequestBody CreatePostRequest requestBody) {
        try {
            Optional<PostEntity> post = postServiceImpl
                    .modifyPost(postId, requestBody.getTitle(), requestBody.getContent());
            log.info("Post succesfully modified");
            return new ResponseEntity<>(post, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping("/{postId}")
    public ResponseEntity<Optional<PostEntity>> getPost(@PathVariable Long postId) {
        try {
            Optional<PostEntity> post = postServiceImpl.findPost(postId);
            return new ResponseEntity<>(post, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping("/{userId}/all")
    public ResponseEntity<AllPostsFromUserResponse> allPostsFromUser(@PathVariable String userId) {
        try {
            AllPostsFromUserResponse allPosts = postServiceImpl.findAllPostsFromUser(userId);
            return new ResponseEntity<>(allPosts, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

}
