package com.seproject.Bookface.feedback.reaction.dto.response;

import com.seproject.Bookface.feedback.reaction.dao.ReactionEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@ToString
public class ReactionsResponse {

    List<ReactionEntity> reactions;

}
