package com.seproject.Bookface.post.dto.response;

import com.seproject.Bookface.feedback.comment.dao.CommentEntity;
import com.seproject.Bookface.feedback.reaction.dao.ReactionEntity;
import com.seproject.Bookface.feedback.reaction.dto.response.ReactionDto;
import com.seproject.Bookface.post.dao.PostEntity;
import lombok.*;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
@Builder
public class PostDto {

    PostEntity postEntity;
    int comments;
    List<ReactionDto> reactions;

}
