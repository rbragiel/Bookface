package com.seproject.Bookface.user.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;
import java.util.Objects;

@Getter
@AllArgsConstructor
@NoArgsConstructor
public class UsersArrayResponse {

    @JsonProperty(value = "users")
    List<UserResponse> users;

    public UserResponse findUser(String userId) {
        for(UserResponse user : users) {
            if (Objects.equals(user.getUserId(), userId)) {
                return user;
            }
        }
        return null;
    }


}
