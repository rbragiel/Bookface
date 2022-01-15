package com.seproject.Bookface.post;

import com.seproject.Bookface.post.dto.request.CreatePostRequest;
import com.seproject.Bookface.post.dto.response.PostsResponseDto;
import com.seproject.Bookface.utils.cloudinary.CloudinaryServiceImpl;
import lombok.RequiredArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin(origins = "*")
@RestController
@RequestMapping(path = "/posts")
@Slf4j
@RequiredArgsConstructor
public class PostController {

    private final PostServiceImpl postService;

    @PostMapping(consumes = MediaType.MULTIPART_FORM_DATA_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addPost(@RequestPart(name="title") String title,
                                          @RequestPart(name="content") String content,
                                          @RequestPart(name="file", required = false) MultipartFile file) {
        try {
            CreatePostRequest requestBody = new CreatePostRequest(title, content);
            ResponseEntity<String> responseEntity = postService.addPost(requestBody, file);
            log.info(responseEntity.getBody());
            return responseEntity;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }


    @DeleteMapping(path = "/{userId}/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
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

    @PutMapping(path = "/{userId}/{postId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
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
    public ResponseEntity<com.seproject.Bookface.post.dao.PostData> getPost(@PathVariable(value = "userId") String userId,
                                                                            @PathVariable("postId") String postId) {
        try {
            return postService.getPost(userId, postId);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping(path = "/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PostsResponseDto> allPostsFromUser(@PathVariable(value = "userId") String userId,
                                                             @RequestParam(value = "page", defaultValue = "0") int page,
                                                             @RequestParam(value = "size", defaultValue = "20") int size) {
        try {
            Pageable paging = PageRequest.of(page, size);
            PostsResponseDto allPosts = postService.findAllPostsFromUser(userId, paging);
            return new ResponseEntity<>(allPosts, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping(path = "/friends", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<PostsResponseDto> allPostsFromFriends(@RequestParam(value = "page", defaultValue = "0") int page,
                                                                @RequestParam(value = "size", defaultValue = "20") int size) {
        try {
            Pageable paging = PageRequest.of(page, size);
            PostsResponseDto allPosts = postService.findAllPostsFromFriends(paging);
            return new ResponseEntity<>(allPosts, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }
}
