package com.seproject.Bookface.feedback.comment;

import com.seproject.Bookface.feedback.comment.dao.CommentEntity;
import com.seproject.Bookface.feedback.comment.dto.request.CreateCommentRequest;
import com.seproject.Bookface.feedback.comment.dto.response.CommentsResponse;
import com.seproject.Bookface.post.PostRepository;
import com.seproject.Bookface.user.dto.response.MeResponse;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.List;

@Service
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;

    public CommentServiceImpl(CommentRepository commentRepository, PostRepository postRepository) {
        this.commentRepository = commentRepository;
        this.postRepository = postRepository;
    }

    public ResponseEntity<String> addComment(CreateCommentRequest requestBody, String postId) {
        MeResponse myUserDetails = (MeResponse) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String me = myUserDetails.getUserId();

        commentRepository.save(CommentEntity.builder()
                .postId(postRepository.getPostEntityByPostId(postId))
                .userId(me)
                .content(requestBody.getContent())
                .date(Timestamp.valueOf(LocalDateTime.now()))
                .build());

        return new ResponseEntity<>("Comment successfully saved", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> removeComment(String commentId) {

        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
            return new ResponseEntity<>("Comment successfully removed", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Comment not found", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<String> modifyComment(String commentId, CreateCommentRequest requestBody) {

        if (commentRepository.existsById(commentId)) {

            CommentEntity commentEntity = commentRepository.getCommentEntityByCommentId(commentId);

            if (requestBody.getContent() != null)
                commentEntity.setContent(requestBody.getContent());

            commentRepository.save(commentEntity);

            return new ResponseEntity<>("Comment successfully modified", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("Comment not found", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<CommentEntity> getCommentByCommentId(String commentId) {
        if (commentRepository.existsById(commentId)) {
            CommentEntity response = commentRepository.getCommentEntityByCommentId(commentId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<CommentsResponse> getAllCommentsByPostId(String postId) {
        List<CommentEntity> response = commentRepository
                .getCommentEntitiesByPostId(postRepository.getPostEntityByPostId(postId));

        return new ResponseEntity<>(new CommentsResponse(response), HttpStatus.OK);
    }

/*
    @Override
    public ResponseEntity<CommentsResponse> getAllCommentsByUserId(String userId) {
        List<CommentEntity> response = commentRepository
                .getCommentEntitiesByUserId(userId);

        return new ResponseEntity<>(new CommentsResponse(response), HttpStatus.OK);
    }

 */
}
