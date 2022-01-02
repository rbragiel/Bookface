package com.seproject.Bookface.post.dto.response;

import com.seproject.Bookface.post.dao.PostEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.ArrayList;
import java.util.Optional;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class AllPostsFromUserResponse {

    Optional<ArrayList<PostEntity>> allPosts;

}
