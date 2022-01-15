package com.seproject.Bookface.feedback.comment;


import com.seproject.Bookface.feedback.comment.dao.CommentData;
import com.seproject.Bookface.post.dao.PostData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentData, String> {

    void deleteAllByPostId(String postId);

    Page<CommentData> findAllByPostIdOrderByDateDesc(String postId, Pageable paging);

    int countAllByPostId(String postId);

    @Query("SELECT u FROM CommentData u WHERE u.commentId = :commentId")
    CommentData getCommentEntityByCommentId(@Param("commentId") String commentId);

    @Query("SELECT u FROM CommentData u WHERE u.postId = :postId")
    List<CommentData> getCommentEntitiesByPostId(@Param("postId") String postId);
/*
    @Query("SELECT u FROM CommentEntity u WHERE u.userId = :userId")
    List<CommentEntity> getCommentEntitiesByUserId(@Param("postId") String userId);

 */
}
