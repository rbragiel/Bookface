package com.seproject.Bookface.friend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.seproject.Bookface.friend.dao.FriendshipEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
public class AllFriendsResponse {

    @JsonProperty(value = "friends")
    List<FriendshipEntity> friendships;

}
