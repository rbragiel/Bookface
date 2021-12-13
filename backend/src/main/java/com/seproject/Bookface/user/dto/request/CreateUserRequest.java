package com.seproject.Bookface.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class CreateUserRequest {
    private String nickname;
    private String password;
    private String email;
}
