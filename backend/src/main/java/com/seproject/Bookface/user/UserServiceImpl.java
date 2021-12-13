package com.seproject.Bookface.user;

import com.seproject.Bookface.contants.Constants;
import com.seproject.Bookface.error.ErrorHandler;
import com.seproject.Bookface.user.dto.request.ActivateRequest;
import com.seproject.Bookface.user.dto.request.CreateUserRequest;
import com.seproject.Bookface.user.dto.request.LoginRequest;
import com.seproject.Bookface.user.dto.response.LoginResponse;
import com.seproject.Bookface.user.dto.response.MeResponse;
import com.seproject.Bookface.user.dto.response.RegisterResponse;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.Collections;

@Service
public class UserServiceImpl implements UserService {
    private final RestTemplate restTemplate;
    private final Constants constants;

    @Autowired
    public UserServiceImpl(RestTemplateBuilder restTemplateBuilder, Constants constants) {
        this.restTemplate = restTemplateBuilder.errorHandler(new ErrorHandler()).build();
        this.constants = constants;
    }

    private HttpHeaders getBasicHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        return headers;
    }

    @Override
    public RegisterResponse register(CreateUserRequest requestBody) {
        final String url = constants.getRegisterUrl();
        HttpHeaders headers = getBasicHeaders();

        HttpEntity<CreateUserRequest> entity = new HttpEntity<>(requestBody, headers);

        return restTemplate.postForObject(url, entity, RegisterResponse.class);
    }

    @Override
    public LoginResponse login(LoginRequest requestBody) {
        final String url = constants.getLoginUrl();
        HttpHeaders headers = getBasicHeaders();

        HttpEntity<LoginRequest> entity = new HttpEntity<>(requestBody, headers);

        return restTemplate.postForObject(url, entity, LoginResponse.class);
    }

    @Override
    public LoginResponse activate(ActivateRequest token) {
        final String activateUrl = constants.getActivateUrl();
        UriComponents uriComponents = UriComponentsBuilder.fromUriString(activateUrl)
                .queryParam("token", token.getToken()).build();

        HttpHeaders headers = getBasicHeaders();

        HttpEntity<ActivateRequest> entity = new HttpEntity<>(token, headers);

        return restTemplate.postForObject(uriComponents.toString(), entity, LoginResponse.class);
    }

    @Override
    public MeResponse me(String token) {
        final String meUrl = constants.getMeUrl();
        HttpHeaders headers = getBasicHeaders();
        headers.set("Authorization", token);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<MeResponse> meResponse = restTemplate.exchange(meUrl, HttpMethod.GET, entity, MeResponse.class);
        return meResponse.getBody();
    }
}
