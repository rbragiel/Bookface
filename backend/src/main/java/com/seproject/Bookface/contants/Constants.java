package com.seproject.Bookface.contants;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.http.HttpHeaders;
import org.springframework.http.MediaType;
import org.springframework.stereotype.Component;

import java.util.Collections;

@NoArgsConstructor
@Component
final public class Constants {
    private final String registerUrl = "/register";
    private final String loginUrl = "/login";
    private final String activateUrl = "/activate";
    private final String meUrl = "/me";
    @Value("${auth.url}")
    private String authUrl;

    private final String searchUrl = "http://localhost:5000/api/user/search";

    private final String invitedUrl = "/all/invited";
    private final String inviteesUrl = "/all/invitees";
    private final String inviteUrl = "/invite/";
    private final String rejectUrl = "/reject/";
    private final String acceptUrl = "/accept/";
    @Value("${invitations.url}")
    private String invitationsUrl;

    private final String allFriendsUrl = "/all";
    @Value("${friends.url}")
    private String friendsUrl;

    public String getRegisterUrl() {
        return authUrl.concat(registerUrl);
    }

    public String getLoginUrl() {
        return authUrl.concat(loginUrl);
    }

    public String getActivateUrl() {
        return authUrl.concat(activateUrl);
    }

    public String getMeUrl() {
        return authUrl.concat(meUrl);
    }

    public String getSearchUrl() {
        return  searchUrl;
    }

    public String getInvitedUrl() {
        return invitationsUrl.concat(invitedUrl);
    }

    public String getInviteesUrl() {
        return invitationsUrl.concat(inviteesUrl);
    }

    public String getInviteUrl() {
        return invitationsUrl.concat(inviteUrl);
    }

    public String getRejectUrl() {
        return invitationsUrl.concat(rejectUrl);
    }

    public String getAcceptUrl() {
        return invitationsUrl.concat(acceptUrl);
    }

    public String getFriendsUrl() {
        return friendsUrl;
    }

    public String getAllFriendsUrl() {
        return friendsUrl.concat(allFriendsUrl);
    }

    public HttpHeaders getBasicHeaders() {
        HttpHeaders headers = new HttpHeaders();
        headers.setContentType(MediaType.APPLICATION_JSON);
        headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));
        return headers;
    }
}
