package com.seproject.Bookface.feedback.reaction;

import com.seproject.Bookface.feedback.reaction.dao.ReactionEntity;
import com.seproject.Bookface.feedback.reaction.dto.request.CreateReactionRequest;
import com.seproject.Bookface.feedback.reaction.dto.response.ReactionsResponse;
import com.seproject.Bookface.post.PostRepository;
import com.seproject.Bookface.user.dto.response.MeResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.List;
import java.util.Objects;

@Service
@AllArgsConstructor
public class ReactionServiceImpl implements ReactionService {

    private final ReactionRepository reactionRepository;
    private final PostRepository postRepository;

    public ResponseEntity<String> addReaction(CreateReactionRequest requestBody, String postId) {
        MeResponse myUserDetails = (MeResponse) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String me = myUserDetails.getUserId();

        if (reactionRepository.existsByPostIdAndUserId(postRepository.getPostEntityByPostId(postId), me)) {
            ReactionEntity reactionEntity = reactionRepository
                    .getReactionEntityByPostIdAndUserId(postRepository.getPostEntityByPostId(postId), me);

            if (!Objects.equals(reactionEntity.getChoice(), requestBody.getChoice())) {
                reactionEntity.setChoice(requestBody.getChoice());
                reactionRepository.save(reactionEntity);
                return new ResponseEntity<>("Reaction successfully saved", HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            reactionRepository.save(ReactionEntity.builder()
                    .postId(postRepository.getPostEntityByPostId(postId))
                    .userId(me)
                    .choice(requestBody.getChoice())
                    .build());

            return new ResponseEntity<>("Reaction successfully saved", HttpStatus.OK);
        }
    }

    @Override
    public ResponseEntity<String> removeReaction(String reactionId) {

        if (reactionRepository.existsById(reactionId)) {
            reactionRepository.deleteById(reactionId);
            return new ResponseEntity<>("Reaction successfully removed", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Reaction not found", HttpStatus.BAD_REQUEST);
        }
    }

/*
    @Override
    public ResponseEntity<String> modifyReaction(String reactionId, CreateReactionRequest requestBody) {

        if (reactionRepository.existsById(reactionId)) {

            ReactionEntity reactionEntity = reactionRepository.getReactionEntityByReactionId(reactionId);

            if (requestBody.getChoice() != null)
                reactionEntity.setChoice(requestBody.getChoice());

            reactionRepository.save(reactionEntity);

            return new ResponseEntity<>("Reaction successfully modified", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Reaction not found", HttpStatus.BAD_REQUEST);
        }
    }
*/

    @Override
    public ResponseEntity<ReactionEntity> getReactionByReactionId(String reactionId) {
        if (reactionRepository.existsById(reactionId)) {
            ReactionEntity response = reactionRepository.getReactionEntityByReactionId(reactionId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<ReactionsResponse> getAllReactionsByPostId(String postId) {
        List<ReactionEntity> response = reactionRepository
                .getReactionEntitiesByPostId(postRepository.getPostEntityByPostId(postId));

        return new ResponseEntity<>(new ReactionsResponse(response), HttpStatus.OK);
    }

}
