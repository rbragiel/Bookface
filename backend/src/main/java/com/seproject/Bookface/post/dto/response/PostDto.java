package com.seproject.Bookface.post.dto.response;

import com.seproject.Bookface.feedback.reaction.dto.response.ReactionDto;
import com.seproject.Bookface.post.dao.PostData;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class PostDto {

    PostData postData;
    int comments;
    List<ReactionDto> reactions;

}
