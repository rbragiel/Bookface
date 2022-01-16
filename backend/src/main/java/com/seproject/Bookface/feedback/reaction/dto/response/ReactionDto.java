package com.seproject.Bookface.feedback.reaction.dto.response;

import com.seproject.Bookface.feedback.reaction.Choice;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@AllArgsConstructor
@Data
@ToString
@Builder
public class ReactionDto {

    private Choice choice;

    private int quantity;

}
