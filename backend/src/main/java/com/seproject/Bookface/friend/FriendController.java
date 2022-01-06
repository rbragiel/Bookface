package com.seproject.Bookface.friend;

import com.seproject.Bookface.friend.dto.response.AllFriendsResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

@RestController
@RequestMapping(path = "/friends")
@Slf4j
public class FriendController {

    private final FriendServiceImpl friendServiceImpl;

    public FriendController(FriendServiceImpl friendService) {
        this.friendServiceImpl = friendService;
    }

    @GetMapping(path = "/all")
    public ResponseEntity<AllFriendsResponse> allFriends() {
        try {
            AllFriendsResponse allFriendsResponse = friendServiceImpl.getAllFriends();
            log.info("Got all friends");
            return new ResponseEntity<>(allFriendsResponse, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping(path = "/all/{id}")
    public ResponseEntity<AllFriendsResponse> allFriendsOf(@PathVariable String id) {
        try {
            AllFriendsResponse allFriendsResponse = friendServiceImpl.getAllFriendsOf(id);
            log.info("Got all friends of " + id);
            return new ResponseEntity<>(allFriendsResponse, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @DeleteMapping(path = "/{id}")
    public ResponseEntity<String> removeFriend(@PathVariable String id) {
        try {
            ResponseEntity<String> responseEntity = friendServiceImpl.removeFriend(id);
            log.info("Friend removed succesfully");
            return responseEntity;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

}
