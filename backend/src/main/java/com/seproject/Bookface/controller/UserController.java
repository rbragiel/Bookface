package com.seproject.Bookface.controller;

import com.seproject.Bookface.model.dto.User;
import com.seproject.Bookface.model.dto.request.CreateUserRequest;
import com.seproject.Bookface.model.dto.response.GetUsersResponse;
import com.seproject.Bookface.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.Map;
import java.util.concurrent.ExecutionException;


@RestController
@RequestMapping(path = "/api/v1/user")
@Slf4j
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }

    //WIP
    //LOGIN (/login)

    @PostMapping(path = "/registration", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerUser(@RequestBody CreateUserRequest requestBody) {
        userService.saveUser(requestBody);
        return new ResponseEntity<>("Account registered", HttpStatus.OK);
    }

    //WIP
    //PASSWORD CHANGE (/changePassword)

    @GetMapping(path = "/{id}/friends", produces = MediaType.APPLICATION_JSON_VALUE)
    public GetUsersResponse getAllFriends(@PathVariable Long id) { return userService.getAllFriendsOf(id); }

    @GetMapping(value = "/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUser(@PathVariable Long id) { return userService.getUser(id); }

    @GetMapping(path = "/all", produces = MediaType.APPLICATION_JSON_VALUE)
    public GetUsersResponse getAllUsers() {
        return userService.getAllUsers();
    }

    /*
    @PostMapping("/{userID}/friend/{friendID}")
    public ResponseEntity<String> addUserToFriends(@PathVariable String userID,
                                                   @PathVariable String friendID, @RequestBody Map<String, String> json) throws ExecutionException, InterruptedException {
        userService.addFriend(userID, friendID);
        return new ResponseEntity<>("Successful added to friends", HttpStatus.OK);
    }

        @GetMapping(path = "/test")
    public void addFriend() {
        userService.addRelationship();
    }

    @PostMapping(path = "/users/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addFriend(@PathVariable Long id, @RequestBody AddFriendRequest friendRequestBody) {
        userService.addFriend(friendRequestBody);

    }
    */

}
