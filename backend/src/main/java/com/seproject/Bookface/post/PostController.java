package com.seproject.Bookface.post;

import com.seproject.Bookface.post.dao.PostEntity;
import com.seproject.Bookface.post.dto.request.CreatePostRequest;
import com.seproject.Bookface.post.dto.response.PostsResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "/posts")
@Slf4j
public class PostController {

    private final PostServiceImpl postService;

    public PostController(PostServiceImpl postService) {
        this.postService = postService;
    }

    @PostMapping(path = "/{userId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addPost(@RequestBody CreatePostRequest requestBody,
                                          @PathVariable(value = "userId") String userId) {
        try {
            ResponseEntity<String> responseEntity = postService.addPost(requestBody, userId);
            log.info(responseEntity.getBody());
            return responseEntity;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @DeleteMapping(path = "/{userId}/{postId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> deletePost(@PathVariable("postId") String postId,
                                             @PathVariable(value = "userId") String userId) {
        try {
            ResponseEntity<String> responseEntity = postService.removePost(postId, userId);
            log.info(responseEntity.getBody());
            return responseEntity;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @PutMapping(path = "/{userId}/{postId}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> modifyPost(@PathVariable("postId") String postId,
                                             @RequestBody CreatePostRequest requestBody,
                                             @PathVariable(value = "userId") String userId) {
        try {
            ResponseEntity<String> responseEntity = postService
                    .modifyPost(postId, requestBody.getTitle(), requestBody.getContent(), userId);
            log.info(responseEntity.getBody());
            return responseEntity;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping(value = "/{userId}/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PostEntity> getPost(@PathVariable(value = "userId") String userId,
                                              @PathVariable("postId") String postId) {
        try {
            return postService.getPost(userId, postId);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping(path = "/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PostsResponse> allPostsFromUser( @PathVariable(value = "userId") String userId,
                                                          @RequestParam(value = "page", defaultValue = "0") int page,
                                                          @RequestParam(value = "size", defaultValue = "20") int size) {
        try {
            Pageable paging = PageRequest.of(page, size);
            PostsResponse allPosts = postService.findAllPostsFromUser(userId, paging);
            return new ResponseEntity<>(allPosts, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping(path = "/{userId}/friends", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PostsResponse> allPostsFromFriends(@PathVariable(value = "userId") String userId,
                                                           @RequestParam(value = "page", defaultValue = "0") int page,
                                                           @RequestParam(value = "size", defaultValue = "20") int size) {
        try {
            Pageable paging = PageRequest.of(page, size);
            PostsResponse allPosts = postService.findAllPostsFromFriends(userId, paging);
            return new ResponseEntity<>(allPosts, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }
}
