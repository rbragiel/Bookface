package com.seproject.Bookface.feedback.comment.dto.response;

import com.seproject.Bookface.feedback.reaction.Choice;
import lombok.*;

import java.sql.Timestamp;


@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class PostCommentsDto {

    private String commentId;

    private String userId;

    private String content;

    private Timestamp date;

}
