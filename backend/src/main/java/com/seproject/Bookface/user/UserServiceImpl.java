package com.seproject.Bookface.user;

import com.seproject.Bookface.contants.Constants;
import com.seproject.Bookface.error.ErrorHandler;
import com.seproject.Bookface.user.dto.request.ActivateRequest;
import com.seproject.Bookface.user.dto.request.CreateUserRequest;
import com.seproject.Bookface.user.dto.request.LoginRequest;
import com.seproject.Bookface.user.dto.response.*;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.HttpEntity;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpMethod;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.client.RestTemplate;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.util.UriComponents;
import org.springframework.web.util.UriComponentsBuilder;

import java.util.HashMap;
import java.util.Map;

@Service
public class UserServiceImpl implements UserService {
    private final RestTemplate restTemplate;
    private final Constants constants;

    @Autowired
    public UserServiceImpl(RestTemplateBuilder restTemplateBuilder, Constants constants) {
        this.restTemplate = restTemplateBuilder.errorHandler(new ErrorHandler()).build();
        this.constants = constants;
    }

    private String getBearerTokenHeader() {
        return ((ServletRequestAttributes) RequestContextHolder.
                getRequestAttributes()).getRequest().getHeader("Authorization");
    }

    @Override
    public RegisterResponse register(CreateUserRequest requestBody) {
        final String url = constants.getRegisterUrl();
        HttpHeaders headers = constants.getBasicHeaders();

        HttpEntity<CreateUserRequest> entity = new HttpEntity<>(requestBody, headers);

        return restTemplate.postForObject(url, entity, RegisterResponse.class);
    }

    @Override
    public LoginResponse login(LoginRequest requestBody) {
        final String url = constants.getLoginUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        HttpEntity<LoginRequest> entity = new HttpEntity<>(requestBody, headers);

        return restTemplate.postForObject(url, entity, LoginResponse.class);
    }

    @Override
    public LoginResponse activate(ActivateRequest token) {
        final String activateUrl = constants.getActivateUrl();
        UriComponents uriComponents = UriComponentsBuilder.fromUriString(activateUrl)
                .queryParam("token", token.getToken()).build();

        HttpHeaders headers = constants.getBasicHeaders();

        HttpEntity<ActivateRequest> entity = new HttpEntity<>(token, headers);

        return restTemplate.postForObject(uriComponents.toString(), entity, LoginResponse.class);
    }

    @Override
    public MeResponse me(String token) {
        final String meUrl = constants.getMeUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", token);
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<MeResponse> meResponse = restTemplate.exchange(meUrl, HttpMethod.GET, entity, MeResponse.class);
        return meResponse.getBody();
    }

    @Override
    public ResponseEntity<SearchResponse> search(String query, int page) {
        final String searchUrl = constants.getSearchUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", getBearerTokenHeader());
        HttpEntity<String> entity = new HttpEntity<>(headers);
        String urlTemplate = UriComponentsBuilder.fromHttpUrl(searchUrl)
                .queryParam("query", "{query}")
                .queryParam("page", "{page}")
                .encode()
                .toUriString();

        Map<String, Object> params = new HashMap<>();
        params.put("query", query);
        params.put("page", page);

        ResponseEntity<SearchResponse> response = restTemplate.exchange(urlTemplate, HttpMethod.GET,
                entity, SearchResponse.class, params);

        return response;
    }

    @Override
    public ResponseEntity<GetUserResponse> getUser(String userId) {
        final String getUserUrl = constants.getGetUserUrl() + userId;
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", getBearerTokenHeader());
        HttpEntity<String> entity = new HttpEntity<>(headers);
        ResponseEntity<GetUserResponse> response = restTemplate.exchange(getUserUrl, HttpMethod.GET,
                entity, GetUserResponse.class);
        return response;
    }
}
