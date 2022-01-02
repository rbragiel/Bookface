package com.seproject.Bookface.friend.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class FriendshipEntity {

    private String userId;

    private String nickname;

    private String email;

    private Timestamp joined;

    private Timestamp friendsSince;

    private String avatarURL;

}
