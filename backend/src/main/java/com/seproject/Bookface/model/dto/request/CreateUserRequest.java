package com.seproject.Bookface.model.dto.request;

import lombok.Getter;
import lombok.ToString;


@Getter
@ToString
public class CreateUserRequest {

    private String nickname;
    private String password;
    private String email;

}
