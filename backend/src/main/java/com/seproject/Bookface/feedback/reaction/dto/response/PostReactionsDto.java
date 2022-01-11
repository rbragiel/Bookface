package com.seproject.Bookface.feedback.reaction.dto.response;

import com.seproject.Bookface.feedback.reaction.Choice;
import lombok.*;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class PostReactionsDto {

    String reactionId;

    String userId;

    Choice choice;

}
