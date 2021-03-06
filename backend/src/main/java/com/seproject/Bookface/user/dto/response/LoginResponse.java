package com.seproject.Bookface.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

import java.sql.Date;
import java.util.Optional;

@Data
@AllArgsConstructor
@ToString
public class LoginResponse {
    private String userId;
    private String nickname;
    private String email;
    private String joined;
    private boolean isActivated;
    private String updatedAt;
    private String token;
    private String role;
    private Optional<String> description;
    private Optional<String> avatarURL;
    private Optional<Date> birthday;
}
