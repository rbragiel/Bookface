package com.seproject.Bookface.user;

import com.seproject.Bookface.user.dto.request.ActivateRequest;
import com.seproject.Bookface.user.dto.request.CreateUserRequest;
import com.seproject.Bookface.user.dto.request.LoginRequest;
import com.seproject.Bookface.user.dto.response.LoginResponse;
import com.seproject.Bookface.user.dto.response.MeResponse;
import com.seproject.Bookface.user.dto.response.RegisterResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

import java.util.ArrayList;
import java.util.Optional;


@RestController
@RequestMapping(path = "/user")
@Slf4j
public class UserController {

    private final UserServiceImpl userServiceImpl;

    public UserController(UserServiceImpl userService) {
        this.userServiceImpl = userService;
    }


    @GetMapping("/me")
    public ResponseEntity<MeResponse> me() {
        SecurityContext sc = SecurityContextHolder.getContext();
        MeResponse me = (MeResponse) sc.getAuthentication().getPrincipal();

        return new ResponseEntity<>(me, HttpStatus.OK);
    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest requestBody) {
        try {
            LoginResponse loginResponse = userServiceImpl.login(requestBody);
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RegisterResponse> registerUser(@RequestBody CreateUserRequest requestBody) {
        try {
            RegisterResponse registerResponse = userServiceImpl.register(requestBody);
            return new ResponseEntity<>(registerResponse, HttpStatus.CREATED);
        } catch (HttpClientErrorException exception) {
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage(), exception);
        }
    }

    @PostMapping(path = "/activate/{token}")
    public ResponseEntity<LoginResponse> activate(@PathVariable String token) {
        ActivateRequest requestBody = new ActivateRequest(token);
        try {
            LoginResponse activateResponse = userServiceImpl.activate(requestBody);
            return new ResponseEntity<>(activateResponse, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage(), exception);
        }
    }
}