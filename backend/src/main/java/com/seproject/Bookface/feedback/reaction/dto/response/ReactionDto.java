package com.seproject.Bookface.feedback.reaction.dto.response;

import com.seproject.Bookface.feedback.reaction.Choice;
import lombok.*;

import javax.persistence.EnumType;
import javax.persistence.Enumerated;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class ReactionDto {

    @Enumerated(EnumType.STRING)
    private Choice choice;

    private int quantity;

}
