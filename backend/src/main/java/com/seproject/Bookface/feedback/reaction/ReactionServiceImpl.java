package com.seproject.Bookface.feedback.reaction;

import com.seproject.Bookface.feedback.reaction.dao.ReactionData;
import com.seproject.Bookface.feedback.reaction.dto.request.CreateReactionRequest;
import com.seproject.Bookface.feedback.reaction.dto.response.PostReactionsDto;
import com.seproject.Bookface.post.PostRepository;
import com.seproject.Bookface.user.dto.response.MeResponse;
import lombok.AllArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.util.ArrayList;
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
            ReactionData reactionEntity = reactionRepository
                    .getReactionEntityByPostIdAndUserId(postRepository.getPostEntityByPostId(postId), me);

            if (!Objects.equals(reactionEntity.getChoice(), Choice.valueOf(requestBody.getChoice()))) {
                reactionEntity.setChoice(Choice.valueOf(requestBody.getChoice()));
                reactionRepository.save(reactionEntity);
                return new ResponseEntity<>("{\"message\": \"Reaction successfully saved\"}", HttpStatus.OK);
            } else {
                return new ResponseEntity<>(HttpStatus.BAD_REQUEST);
            }
        } else {
            reactionRepository.save(ReactionData.builder()
                    .postId(postRepository.getPostEntityByPostId(postId))
                    .userId(me)
                    .choice(Choice.valueOf(requestBody.getChoice()))
                    .build());

            return new ResponseEntity<>("{\"message\": \"Reaction successfully saved\"}", HttpStatus.OK);
        }
    }

    @Override
    public ResponseEntity<String> removeReaction(String reactionId) {

        if (reactionRepository.existsById(reactionId)) {
            reactionRepository.deleteById(reactionId);
            return new ResponseEntity<>("{\"message\": \"Reaction successfully removed\"}", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("{\"message\": \"Reaction not found\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<ReactionData> getReactionByReactionId(String reactionId) {
        if (reactionRepository.existsById(reactionId)) {
            ReactionData response = reactionRepository.getReactionEntityByReactionId(reactionId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<List<PostReactionsDto>> getAllReactionsByPostId(String postId) {
        List<PostReactionsDto> response = new ArrayList<>();
        List<ReactionData> reactionList = reactionRepository
                .getReactionEntitiesByPostId(postRepository.getPostEntityByPostId(postId));
        for (ReactionData reaction: reactionList) {
            response.add(new PostReactionsDto(reaction.getReactionId(), reaction.getUserId(), reaction.getChoice()));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
