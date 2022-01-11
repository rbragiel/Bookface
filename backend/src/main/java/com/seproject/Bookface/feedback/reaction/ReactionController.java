package com.seproject.Bookface.feedback.reaction;

import com.seproject.Bookface.feedback.reaction.dao.ReactionEntity;
import com.seproject.Bookface.feedback.reaction.dto.request.CreateReactionRequest;
import com.seproject.Bookface.feedback.reaction.dto.response.PostReactionsDto;
import com.seproject.Bookface.feedback.reaction.dto.response.ReactionsResponseDto;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;
import java.util.Objects;

@AllArgsConstructor
@RestController
@RequestMapping(path = "/reactions") // potencjalnie do zmiany
@Slf4j
public class ReactionController {

    private final ReactionServiceImpl reactionService;

    @PostMapping(path="/{postId}", consumes = MediaType.APPLICATION_JSON_VALUE)
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

    @GetMapping(path = "/{postId}/{reactionId}")
    public ResponseEntity<ReactionEntity> getReaction(@PathVariable("reactionId") String reactionId) {
        try {
            ResponseEntity<ReactionEntity> response = reactionService.getReactionByReactionId(reactionId);
            log.info(Objects.requireNonNull(response.getBody()).toString());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @DeleteMapping(path = "/{postId}/{reactionId}")
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

    @GetMapping(path = "/{postId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<List<PostReactionsDto>> getPostReactions(@PathVariable("postId") String postId) {
        try {
            ResponseEntity<List<PostReactionsDto>> response = reactionService.getAllReactionsByPostId(postId);
            log.info(Objects.requireNonNull(response.getBody()).toString());
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }
}
