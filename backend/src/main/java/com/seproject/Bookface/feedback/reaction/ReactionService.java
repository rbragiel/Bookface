package com.seproject.Bookface.feedback.reaction;

import com.seproject.Bookface.feedback.reaction.dao.ReactionData;
import com.seproject.Bookface.feedback.reaction.dto.request.CreateReactionRequest;
import com.seproject.Bookface.feedback.reaction.dto.response.PostReactionsDto;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface ReactionService {

    ResponseEntity<String> addReaction(CreateReactionRequest requestBody, String postId);

    ResponseEntity<String> removeReaction(String reactionId);

    //ResponseEntity<String> modifyReaction(String reactionId, CreateReactionRequest requestBody);

    ResponseEntity<ReactionData> getReactionByReactionId(String reactionId);

    ResponseEntity<List<PostReactionsDto>> getAllReactionsByPostId(String postId);

}
