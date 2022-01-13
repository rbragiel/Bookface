package com.seproject.Bookface.feedback.comment;

import com.seproject.Bookface.feedback.comment.dao.CommentEntity;
import com.seproject.Bookface.feedback.comment.dto.request.CreateCommentRequest;
import com.seproject.Bookface.feedback.comment.dto.response.CommentsResponseDto;
import com.seproject.Bookface.feedback.comment.dto.response.PostCommentsDto;
import org.springframework.data.domain.Pageable;
import org.springframework.http.ResponseEntity;

import java.util.List;

public interface CommentService {

    ResponseEntity<String> addComment(CreateCommentRequest requestBody, String movieId);

    ResponseEntity<String> removeComment(String commentId);

    ResponseEntity<String> modifyComment(String commentId, CreateCommentRequest requestBody);

    ResponseEntity<CommentEntity> getCommentByCommentId(String commentId);

    ResponseEntity<List<PostCommentsDto>> getAllCommentsByPostId(String postId, Pageable paging);

    //ResponseEntity<CommentsResponse> getAllCommentsByUserId(String userId);
}

