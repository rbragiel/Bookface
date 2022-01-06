package com.seproject.Bookface.feedback.comment;

import com.seproject.Bookface.feedback.comment.dao.CommentEntity;
import com.seproject.Bookface.feedback.comment.dto.request.CreateCommentRequest;
import com.seproject.Bookface.feedback.comment.dto.response.CommentsResponse;
import org.springframework.http.ResponseEntity;

public interface CommentService {

    ResponseEntity<String> addComment(CreateCommentRequest requestBody, String movieId);

    ResponseEntity<String> removeComment(String commentId);

    ResponseEntity<String> modifyComment(String commentId, CreateCommentRequest requestBody);

    ResponseEntity<CommentEntity> getCommentByCommentId(String commentId);

    ResponseEntity<CommentsResponse> getAllCommentsByPostId(String postId);

    //ResponseEntity<CommentsResponse> getAllCommentsByUserId(String userId);
}

