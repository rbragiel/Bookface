package com.seproject.Bookface.feedback.comment;

import com.seproject.Bookface.feedback.comment.dao.CommentData;
import com.seproject.Bookface.feedback.comment.dto.request.CreateCommentRequest;
import com.seproject.Bookface.feedback.comment.dto.response.PostCommentsDto;
import com.seproject.Bookface.post.PostRepository;
import com.seproject.Bookface.user.UserServiceImpl;
import com.seproject.Bookface.user.dto.response.MeResponse;
import com.seproject.Bookface.user.dto.response.UsersArrayResponse;
import lombok.RequiredArgsConstructor;
import org.springframework.data.domain.Pageable;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.stereotype.Service;

import java.sql.Timestamp;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.List;

@Service
@RequiredArgsConstructor
public class CommentServiceImpl implements CommentService {

    private final CommentRepository commentRepository;
    private final PostRepository postRepository;
    private final UserServiceImpl userService;

    public ResponseEntity<String> addComment(CreateCommentRequest requestBody, String postId) {
        MeResponse myUserDetails = (MeResponse) SecurityContextHolder.getContext().getAuthentication().getPrincipal();
        String me = myUserDetails.getUserId();

        commentRepository.save(CommentData.builder()
                .postId(postId)
                .userId(me)
                .content(requestBody.getContent())
                .date(Timestamp.valueOf(LocalDateTime.now()))
                .build());

        return new ResponseEntity<>("{\"message\": \"Comment successfully saved\"}", HttpStatus.OK);
    }

    @Override
    public ResponseEntity<String> removeComment(String commentId) {

        if (commentRepository.existsById(commentId)) {
            commentRepository.deleteById(commentId);
            return new ResponseEntity<>("{\"message\": \"Comment successfully removed\"}", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("{\"message\": \"Comment not found\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<String> modifyComment(String commentId, CreateCommentRequest requestBody) {

        if (commentRepository.existsById(commentId)) {

            CommentData commentEntity = commentRepository.getCommentEntityByCommentId(commentId);

            if (requestBody.getContent() != null)
                commentEntity.setContent(requestBody.getContent());

            commentRepository.save(commentEntity);

            return new ResponseEntity<>("{\"message\": \"Comment successfully modified\"}", HttpStatus.OK);
        } else {
            return new ResponseEntity<>("{\"message\": \"Comment not found\"}", HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<CommentData> getCommentByCommentId(String commentId) {
        if (commentRepository.existsById(commentId)) {
            CommentData response = commentRepository.getCommentEntityByCommentId(commentId);
            return new ResponseEntity<>(response, HttpStatus.OK);
        } else {
            return new ResponseEntity<>(null, HttpStatus.BAD_REQUEST);
        }
    }

    @Override
    public ResponseEntity<List<PostCommentsDto>> getAllCommentsByPostId(String postId, Pageable paging) {
        List<PostCommentsDto> response = new ArrayList<>();
        List<CommentData> commentEntityList = commentRepository
                .findAllByPostIdOrderByDateDesc(postId, paging).getContent();

        List<String> userIds = new ArrayList<>();
        for(CommentData commentData : commentEntityList) {
            userIds.add(commentData.getUserId());
        }

        UsersArrayResponse usersArray = userService.getUsers(userIds).getBody();

        for (CommentData commentEntity: commentEntityList) {
            response.add(new PostCommentsDto(commentEntity.getCommentId(), usersArray.findUser(commentEntity.getUserId()), commentEntity.getContent(), commentEntity.getDate()));
        }
        return new ResponseEntity<>(response, HttpStatus.OK);
    }
}
