package com.seproject.Bookface.user.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
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
    @JsonProperty("isInviter")
    private boolean isInviter;
    @JsonProperty("isInvitee")
    private boolean isInvitee;
    private Optional<Date> friendsSince;
    private Optional<String> description;
    private Optional<String> avatarURL;
    private Optional<Date> birthday;
}
