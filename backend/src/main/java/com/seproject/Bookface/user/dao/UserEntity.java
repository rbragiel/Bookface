package com.seproject.Bookface.user.dao;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@NoArgsConstructor
@AllArgsConstructor
public class UserEntity {

    private String userId;

    private String nickname;

    private String email;

    private String avatarURL;

}
