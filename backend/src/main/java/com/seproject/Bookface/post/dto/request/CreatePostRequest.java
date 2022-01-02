package com.seproject.Bookface.post.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class CreatePostRequest {

    private String title;

    private String content;

}
