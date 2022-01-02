package com.seproject.Bookface.invitation.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.sql.Timestamp;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class Invitee {

    private String userId;

    private String nickname;

    private String email;

    private String avatarURL;

    private Timestamp joined;

}
