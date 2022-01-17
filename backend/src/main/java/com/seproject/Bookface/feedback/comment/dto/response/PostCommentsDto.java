package com.seproject.Bookface.feedback.comment.dto.response;

import com.seproject.Bookface.feedback.reaction.Choice;
import com.seproject.Bookface.user.dto.response.ReturnedUser;
import lombok.*;

import java.sql.Timestamp;


@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class PostCommentsDto {

    private String commentId;

    private ReturnedUser user;

    private String content;

    private Timestamp date;

}
