package com.seproject.Bookface.user.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class LoginRequest {
    private String email;
    private String password;
}
