package com.seproject.Bookface.controller;

import com.seproject.Bookface.model.dto.request.ActivateRequest;
import com.seproject.Bookface.model.dto.request.CreateUserRequest;
import com.seproject.Bookface.model.dto.request.LoginRequest;
import com.seproject.Bookface.service.UserService;
import lombok.extern.slf4j.Slf4j;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.data.repository.query.Param;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;


@RestController
@RequestMapping(path = "/api/user")
@Slf4j
public class UserController {

    private final UserService userService;

    @Autowired
    public UserController(UserService userService) {
        this.userService = userService;

    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> loginUser(@RequestBody LoginRequest requestBody) {
        try {
            userService.login(requestBody);
        } catch (HttpClientErrorException exception) {
            System.out.println(exception.getMessage());
            return new ResponseEntity<>(exception.getMessage(), exception.getStatusCode());
        }

        return new ResponseEntity<>("Logged in", HttpStatus.OK);
    }

    @PostMapping(path = "/registration", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> registerUser(@RequestBody CreateUserRequest requestBody) {
        try {
            userService.registerUser(requestBody);
        } catch (HttpClientErrorException exception) {
            System.out.println(exception.getMessage());
            return new ResponseEntity<>(exception.getMessage(), exception.getStatusCode());
        }
        return new ResponseEntity<>("Account registered", HttpStatus.OK);
    }
/*
    @PatchMapping(path = "/activate/{token}")
    public ResponseEntity<String> activateUser(@Param("token") String token) {

        ActivateRequest requestBody = new ActivateRequest(token);

        try {
            userService.activate(requestBody);
        } catch (HttpClientErrorException exception) {
            System.out.println(exception.getMessage());
            return new ResponseEntity<>(exception.getMessage(), exception.getStatusCode());
        }
        return new ResponseEntity<>("Account activated", HttpStatus.OK);
    }
*/

    @GetMapping(path = "/test", produces = MediaType.APPLICATION_JSON_VALUE)
    public String test() {
        return "test";
    }

}
