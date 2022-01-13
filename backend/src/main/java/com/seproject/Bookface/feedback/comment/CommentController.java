package com.seproject.Bookface.feedback.comment;

import com.seproject.Bookface.feedback.comment.dao.CommentData;
import com.seproject.Bookface.feedback.comment.dto.request.CreateCommentRequest;
import com.seproject.Bookface.feedback.comment.dto.response.PostCommentsDto;
import lombok.extern.slf4j.Slf4j;
import org.springframework.data.domain.PageRequest;
import org.springframework.data.domain.Pageable;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@RestController
@RequestMapping(path = "/comments")
@Slf4j
public class CommentController {

    private final CommentServiceImpl commentService;

    public CommentController(CommentServiceImpl commentService) {
        this.commentService = commentService;
    }

    @PostMapping(path="/{postId}", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
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

    @GetMapping(path = "/{postId}/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<CommentData> getComment(@PathVariable("commentId") String commentId) {
        try {
            ResponseEntity<CommentData> response = commentService.getCommentByCommentId(commentId);
            log.info(response.getBody().toString());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @DeleteMapping(path = "/{postId}/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
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

    @PutMapping(path = "/{postId}/{commentId}", produces = MediaType.APPLICATION_JSON_VALUE)
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

    @GetMapping(path = "/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostCommentsDto>> getPostComments(@PathVariable("postId") String postId,
                                                                 @RequestParam("page") int page,
                                                                 @RequestParam("size") int size) {
        try {
            Pageable paging = PageRequest.of(page, size);
            ResponseEntity<List<PostCommentsDto>> response = commentService.getAllCommentsByPostId(postId, paging);
            log.info(response.getBody().toString());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

}
