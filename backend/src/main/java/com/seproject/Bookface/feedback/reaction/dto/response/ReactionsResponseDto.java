package com.seproject.Bookface.feedback.reaction.dto.response;

import com.seproject.Bookface.feedback.reaction.dao.ReactionData;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@ToString
public class ReactionsResponseDto {

    List<ReactionData> reactions;

}
