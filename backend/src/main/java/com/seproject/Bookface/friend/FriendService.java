package com.seproject.Bookface.friend;

import com.seproject.Bookface.friend.dto.response.AllFriendsResponse;
import org.springframework.http.ResponseEntity;

public interface FriendService {

    AllFriendsResponse getAllFriends();

    AllFriendsResponse getAllFriendsOf(String id);

    ResponseEntity<String> removeFriend(String id);

}
