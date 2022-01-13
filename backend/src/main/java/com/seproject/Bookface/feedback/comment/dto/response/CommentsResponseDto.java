package com.seproject.Bookface.feedback.comment.dto.response;

import com.seproject.Bookface.feedback.comment.dao.CommentData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@ToString
public class CommentsResponseDto {

    List<CommentData> comments;

}
