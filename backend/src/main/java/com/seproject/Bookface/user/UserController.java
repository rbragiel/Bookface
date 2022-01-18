package com.seproject.Bookface.user;

import com.seproject.Bookface.user.dto.request.ActivateRequest;
import com.seproject.Bookface.user.dto.request.CreateUserRequest;
import com.seproject.Bookface.user.dto.request.LoginRequest;
import com.seproject.Bookface.user.dto.response.*;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.security.core.context.SecurityContext;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.server.ResponseStatusException;

import java.util.List;

@CrossOrigin
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
        log.info(me.toString());
        return new ResponseEntity<>(me, HttpStatus.OK);
    }

    @PostMapping(path = "/login", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponse> loginUser(@RequestBody LoginRequest requestBody) {
        try {
            LoginResponse loginResponse = userServiceImpl.login(requestBody);
            log.info("User successfully logged in");
            return new ResponseEntity<>(loginResponse, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @PostMapping(path = "/register", consumes = MediaType.APPLICATION_JSON_VALUE, produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<RegisterResponse> registerUser(@RequestBody CreateUserRequest requestBody) {
        try {
            RegisterResponse registerResponse = userServiceImpl.register(requestBody);
            log.info("User successfully registered");
            return new ResponseEntity<>(registerResponse, HttpStatus.CREATED);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage(), exception);
        }
    }

    @PostMapping(path = "/activate/{token}", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<LoginResponse> activate(@PathVariable String token) {
        ActivateRequest requestBody = new ActivateRequest(token);
        try {
            LoginResponse activateResponse = userServiceImpl.activate(requestBody);
            log.info("User successfully activated by email");
            return new ResponseEntity<>(activateResponse, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage(), exception);
        }
    }

    @PostMapping(path ="/logout", produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> logout() {
        SecurityContextHolder.clearContext();
        return new ResponseEntity<>("{\"message\": \"Logged out successfully\"}", HttpStatus.OK);
    }

    @GetMapping(path = "/search")
    public ResponseEntity<SearchResponse> search(@RequestParam("query") String query, @RequestParam("page") int page) {
        try {
            ResponseEntity<SearchResponse> response = userServiceImpl.search(query, page);
            log.info("Users successfully searched");
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage(), exception);
        }
    }

    @PatchMapping(produces = MediaType.APPLICATION_JSON_VALUE)
    public ResponseEntity<String> getUser(@RequestPart(name="description", required = false) String description,
                                              @RequestPart(name="birthday", required = false) String birthday,
                                              @RequestPart(name="file", required = false) MultipartFile file) {
        try {
            ResponseEntity<String> response = userServiceImpl.updateUser(description, birthday, file);
            //log.info(String.valueOf(response.getBody()));
            return response;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage(), exception);
        }
    }

    @GetMapping(path = "/{userId}", produces = MediaType.APPLICATION_JSON_VALUE)
    public GetUserResponse getUser(@PathVariable String userId) {
        try {
            ResponseEntity<GetUserResponse> response = userServiceImpl.getUser(userId);
            log.info(String.valueOf(response.getBody()));
            return response.getBody();
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage(), exception);
        }
    }

}
