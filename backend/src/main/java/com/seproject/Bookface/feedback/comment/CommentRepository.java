package com.seproject.Bookface.feedback.comment;


import com.seproject.Bookface.feedback.comment.dao.CommentEntity;
import com.seproject.Bookface.post.dao.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface CommentRepository extends JpaRepository<CommentEntity, String> {

    Page<CommentEntity> findAllByPostIdOrderByDateDesc(PostEntity postId, Pageable paging);

    int countAllByPostId(PostEntity postId);

    @Query("SELECT u FROM CommentEntity u WHERE u.commentId = :commentId")
    CommentEntity getCommentEntityByCommentId(@Param("commentId") String commentId);

    @Query("SELECT u FROM CommentEntity u WHERE u.postId = :postId")
    List<CommentEntity> getCommentEntitiesByPostId(@Param("postId") PostEntity postId);
/*
    @Query("SELECT u FROM CommentEntity u WHERE u.userId = :userId")
    List<CommentEntity> getCommentEntitiesByUserId(@Param("postId") String userId);

 */
}
