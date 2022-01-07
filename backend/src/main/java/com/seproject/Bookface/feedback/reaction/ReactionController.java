package com.seproject.Bookface.feedback.reaction;

import com.seproject.Bookface.feedback.reaction.dao.ReactionEntity;
import com.seproject.Bookface.feedback.reaction.dto.request.CreateReactionRequest;
import com.seproject.Bookface.feedback.reaction.dto.response.ReactionsResponse;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/users/{userId}/posts/{postId}/reactions") // potencjalnie do zmiany
@Slf4j
public class ReactionController {

    private final ReactionServiceImpl reactionService;

    @PostMapping(consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> addReaction(@RequestBody CreateReactionRequest requestBody,
                                             @PathVariable("postId") String postId) {
        try {
            ResponseEntity<String> response = reactionService.addReaction(requestBody, postId);
            log.info(response.getBody());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping(path = "/{reactionId}")
    public ResponseEntity<ReactionEntity> getReaction(@PathVariable("reactionId") String reactionId) {
        try {
            ResponseEntity<ReactionEntity> response = reactionService.getReactionByReactionId(reactionId);
            log.info(response.getBody().toString());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @DeleteMapping(path = "/{reactionId}")
    public ResponseEntity<String> deleteReaction(@PathVariable("reactionId") String reactionId) {
        try {
            ResponseEntity<String> response = reactionService.removeReaction(reactionId);
            log.info(response.getBody());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<ReactionsResponse> getPostReactions(@PathVariable("postId") String postId) {
        try {
            ResponseEntity<ReactionsResponse> response = reactionService.getAllReactionsByPostId(postId);
            log.info(response.getBody().toString());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }
}
