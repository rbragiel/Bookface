package com.seproject.Bookface.service;

import com.google.gson.Gson;
import com.google.gson.JsonObject;
import com.seproject.Bookface.model.dto.request.ActivateRequest;
import com.seproject.Bookface.model.dto.request.CreateUserRequest;
import com.seproject.Bookface.model.dto.request.LoginRequest;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Service
public class UserService {

    private final RestTemplate restTemplate;
    private String authToken;

    public String getAuthToken() {
        return authToken;
    }

    @Autowired
    public UserService(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }

    public void registerUser(CreateUserRequest requestBody) {
        String url = "http://localhost:5000/api/auth/register";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<CreateUserRequest> entity = new HttpEntity<>(requestBody, headers);

        // send POST request
        restTemplate.postForObject(url, entity, CreateUserRequest.class);

    }

    public void login(LoginRequest requestBody) {
        Gson gson = new Gson();
        String url = "http://localhost:5000/api/auth/login";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<LoginRequest> entity = new HttpEntity<>(requestBody, headers);

        // send POST request
        ResponseEntity<String> response = restTemplate.postForEntity(url, entity, String.class);

        JsonObject jsonObject = gson.fromJson(response.getBody(), JsonObject.class);
        authToken = jsonObject.get("token").getAsString();
        System.out.println(authToken);
    }

    /*
    public void activate(ActivateRequest token) {
        String url = "http://localhost:5000/api/auth/activate";

        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

        HttpEntity<ActivateRequest> entity = new HttpEntity<>(token, headers);

        restTemplate.patchForObject(url, entity, String.class);
    }
    */
}
