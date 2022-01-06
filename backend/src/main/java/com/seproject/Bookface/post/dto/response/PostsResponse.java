package com.seproject.Bookface.post.dto.response;

import com.seproject.Bookface.post.dao.PostEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class PostsResponse {

    List<PostEntity> allPosts;

}
