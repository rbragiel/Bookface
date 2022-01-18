package com.seproject.Bookface.user.dto.response;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class UserResponse {

    private String userId;
    private String nickname;
    private String email;
    private String avatarURL;

}
