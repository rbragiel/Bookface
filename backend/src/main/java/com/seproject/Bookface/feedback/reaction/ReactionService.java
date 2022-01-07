package com.seproject.Bookface.feedback.reaction;

import com.seproject.Bookface.feedback.reaction.dao.ReactionEntity;
import com.seproject.Bookface.feedback.reaction.dto.request.CreateReactionRequest;
import com.seproject.Bookface.feedback.reaction.dto.response.ReactionsResponse;
import org.springframework.http.ResponseEntity;

public interface ReactionService {

    ResponseEntity<String> addReaction(CreateReactionRequest requestBody, String postId);

    ResponseEntity<String> removeReaction(String reactionId);

    //ResponseEntity<String> modifyReaction(String reactionId, CreateReactionRequest requestBody);

    ResponseEntity<ReactionEntity> getReactionByReactionId(String reactionId);

    ResponseEntity<ReactionsResponse> getAllReactionsByPostId(String postId);

}
