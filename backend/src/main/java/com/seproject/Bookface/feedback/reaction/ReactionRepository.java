package com.seproject.Bookface.feedback.reaction;

import com.seproject.Bookface.feedback.reaction.dao.ReactionData;
import com.seproject.Bookface.post.dao.PostData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository<ReactionData, String> {

    int countAllByPostIdAndChoice(PostData postId, Choice choice);

    @Query("SELECT u FROM ReactionData u WHERE u.reactionId = :reactionId")
    ReactionData getReactionEntityByReactionId(@Param("reactionId") String reactionId);

    @Query("SELECT u FROM ReactionData u WHERE u.postId = :postId")
    List<ReactionData> getReactionEntitiesByPostId(@Param("postId") PostData postId);

    boolean existsByPostIdAndUserId(PostData postId, String userId);

    ReactionData getReactionEntityByPostIdAndUserId(PostData postId, String userId);

}
