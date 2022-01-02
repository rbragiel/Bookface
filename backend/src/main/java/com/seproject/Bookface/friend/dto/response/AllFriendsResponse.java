package com.seproject.Bookface.friend.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.seproject.Bookface.friend.dao.FriendshipEntity;

import java.util.List;

public class AllFriendsResponse {

    @JsonProperty(value = "friends")
    List<FriendshipEntity> friendships;

}
