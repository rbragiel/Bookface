package com.seproject.Bookface.feedback.comment;

import com.seproject.Bookface.feedback.comment.dao.CommentEntity;
import com.seproject.Bookface.feedback.comment.dto.request.CreateCommentRequest;
import com.seproject.Bookface.feedback.comment.dto.response.CommentsResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "/posts/{postId}/comments")
@Slf4j
public class CommentController {

    private final CommentServiceImpl commentService;

    public CommentController(CommentServiceImpl commentService) {
        this.commentService = commentService;
    }

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addComment(@RequestBody CreateCommentRequest requestBody,
                                             @PathVariable("postId") String postId) {
        try {
            ResponseEntity<String> response = commentService.addComment(requestBody, postId);
            log.info(response.getBody());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping(path = "/{commentId}")
    public ResponseEntity<CommentEntity> getComment(@PathVariable("commentId") String commentId) {
        try {
            ResponseEntity<CommentEntity> response = commentService.getCommentByCommentId(commentId);
            log.info(response.getBody().toString());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @DeleteMapping(path = "/{commentId}")
    public ResponseEntity<String> deleteComment(@PathVariable("commentId") String commentId) {
        try {
            ResponseEntity<String> response = commentService.removeComment(commentId);
            log.info(response.getBody());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @PutMapping(path = "/{commentId}")
    public ResponseEntity<String> updateComment(@PathVariable("commentId") String commentId,
                                                @RequestBody CreateCommentRequest requestBody) {
        try {
            ResponseEntity<String> response = commentService.modifyComment(commentId, requestBody);
            log.info(response.getBody());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CommentsResponse> getPostComments(@PathVariable("postId") String postId) {
        try {
            ResponseEntity<CommentsResponse> response = commentService.getAllCommentsByPostId(postId);
            log.info(response.getBody().toString());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

}
