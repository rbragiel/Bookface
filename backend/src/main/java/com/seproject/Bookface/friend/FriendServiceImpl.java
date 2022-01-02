package com.seproject.Bookface.friend;

import com.seproject.Bookface.contants.Constants;
import com.seproject.Bookface.error.ErrorHandler;
import com.seproject.Bookface.friend.dto.response.AllFriendsResponse;
import com.seproject.Bookface.invitation.dto.response.AllInvitedResponse;
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


@Service
public class FriendServiceImpl implements FriendService{

    private final RestTemplate restTemplate;
    private final Constants constants;

    @Autowired
    public FriendServiceImpl(RestTemplateBuilder restTemplateBuilder, Constants constants) {
        this.restTemplate = restTemplateBuilder.errorHandler(new ErrorHandler()).build();
        this.constants = constants;
    }

    public String getBearerTokenHeader() {
        return ((ServletRequestAttributes) RequestContextHolder.
                getRequestAttributes()).getRequest().getHeader("Authorization");
    }

    @Override
    public AllFriendsResponse getAllFriends() {
        final String allFriendsUrl = constants.getAllFriendsUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", getBearerTokenHeader());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<AllFriendsResponse> responseEntity = restTemplate.exchange(allFriendsUrl, HttpMethod.GET,
                entity, AllFriendsResponse.class);

        return responseEntity.getBody();
    }

    @Override
    public AllFriendsResponse getAllFriendsOf(String id) {
        final String allFriendsUrl = constants.getAllFriendsUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", getBearerTokenHeader());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<AllFriendsResponse> responseEntity = restTemplate.exchange(allFriendsUrl.concat("/" + id),
                HttpMethod.GET, entity, AllFriendsResponse.class);

        return responseEntity.getBody();
    }

    @Override
    public ResponseEntity<String> removeFriend(String id) {
        final String friendsUrl = constants.getFriendsUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", getBearerTokenHeader());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(friendsUrl.concat("/" + id), HttpMethod.DELETE,
                entity, String.class);

        return responseEntity;

    }
}
