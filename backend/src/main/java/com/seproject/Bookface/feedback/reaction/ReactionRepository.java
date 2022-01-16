package com.seproject.Bookface.feedback.reaction;

import com.seproject.Bookface.feedback.reaction.dao.ReactionData;
import com.seproject.Bookface.post.dao.PostData;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;
import java.util.Optional;

@Repository
public interface ReactionRepository extends JpaRepository<ReactionData, String> {

    void deleteAllByPostId(String postId);
    List<ReactionData> getAllByPostIdAndChoice(String postId, Choice choice);

    @Query("SELECT u FROM ReactionData u WHERE u.reactionId = :reactionId")
    ReactionData getReactionEntityByReactionId(@Param("reactionId") String reactionId);

    @Query("SELECT u FROM ReactionData u WHERE u.postId = :postId")
    List<ReactionData> getReactionEntitiesByPostId(@Param("postId") String postId);

    boolean existsByPostIdAndUserId(String postId, String userId);

    ReactionData getReactionEntityByPostIdAndUserId(String postId, String userId);

    @Query("select r from ReactionData r where r.postId = ?1 and r.userId = ?2")
    Optional<ReactionData> findByPostIdAndUserId(PostData postId, String userId);


}
