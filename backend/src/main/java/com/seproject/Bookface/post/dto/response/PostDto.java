package com.seproject.Bookface.post.dto.response;

import com.seproject.Bookface.feedback.reaction.Choice;
import com.seproject.Bookface.feedback.reaction.dto.response.ReactionDto;
import com.seproject.Bookface.post.dao.PostData;
import lombok.*;

import java.util.ArrayList;
import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class PostDto {

    private PostData postData;
    private int comments;
    private List<ReactionDto> reactions;
    private Choice choice;

}
