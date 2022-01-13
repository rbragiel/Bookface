package com.seproject.Bookface.feedback.reaction;

import com.seproject.Bookface.feedback.reaction.dao.ReactionEntity;
import com.seproject.Bookface.post.dao.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface ReactionRepository extends JpaRepository<ReactionEntity, String> {

    int countAllByPostIdAndChoice(PostEntity postId, Choice choice);

    @Query("SELECT u FROM ReactionEntity u WHERE u.reactionId = :reactionId")
    ReactionEntity getReactionEntityByReactionId(@Param("reactionId") String reactionId);

    @Query("SELECT u FROM ReactionEntity u WHERE u.postId = :postId")
    List<ReactionEntity> getReactionEntitiesByPostId(@Param("postId") PostEntity postId);

    boolean existsByPostIdAndUserId(PostEntity postId, String userId);

    ReactionEntity getReactionEntityByPostIdAndUserId(PostEntity postId, String userId);

}
