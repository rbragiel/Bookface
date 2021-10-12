package com.seproject.Bookface.controller;

import com.seproject.Bookface.model.dto.User;
import com.seproject.Bookface.model.dto.request.CreateUserRequest;
import com.seproject.Bookface.model.dto.response.GetUsersResponse;
import com.seproject.Bookface.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.MediaType;
import org.springframework.web.bind.annotation.*;


@RestController
@RequestMapping(path = "/api/v1")
@Slf4j
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;
    }


    @PostMapping(path = "/users", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addUser(@RequestBody CreateUserRequest requestBody) {
        log.info("calling addUser with params " + requestBody.toString());
        userService.saveUser(requestBody);
    }

    @GetMapping(path = "/users", produces = MediaType.APPLICATION_JSON_VALUE)
    public GetUsersResponse getAllUsers() {
        return userService.getAllUsers();
    }

    @GetMapping(value = "/users/{id}", produces = MediaType.APPLICATION_JSON_VALUE)
    public User getUser(@PathVariable Long id) { return userService.getUser(id); }

    @GetMapping(path = "/test")
    public void addFriend() {
        userService.addRelationship();
    }

/*
    @PostMapping(path = "/users/{id}", consumes = MediaType.APPLICATION_JSON_VALUE)
    public void addFriend(@PathVariable Long id, @RequestBody AddFriendRequest friendRequestBody) {
        userService.addFriend(friendRequestBody);

    }
*/

    @GetMapping(value = "/users/{id}/friends", produces = MediaType.APPLICATION_JSON_VALUE)
    public GetUsersResponse getAllFriends(@PathVariable Long id) { return userService.getAllFriendsOf(id); }
}
