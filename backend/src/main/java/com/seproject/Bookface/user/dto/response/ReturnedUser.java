package com.seproject.Bookface.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.Date;
import java.util.Optional;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class ReturnedUser {
    private String userId;
    private String nickname;
    private String email;
    private String joined;
    private boolean areFriends;
    private Optional<Date> friendsSince;
    private Optional<String> description;
    private Optional<String> avatarURL;
    private Optional<Date> birthday;
}
