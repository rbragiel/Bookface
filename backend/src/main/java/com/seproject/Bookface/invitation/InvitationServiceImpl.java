package com.seproject.Bookface.invitation;

import com.seproject.Bookface.contants.Constants;
import com.seproject.Bookface.error.ErrorHandler;
import com.seproject.Bookface.invitation.dto.response.AllInvitedResponse;
import com.seproject.Bookface.invitation.dto.response.AllInviteesResponse;
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
public class InvitationServiceImpl implements InvitationService {
    private final RestTemplate restTemplate;
    private final Constants constants;

    @Autowired
    public InvitationServiceImpl(RestTemplateBuilder restTemplateBuilder, Constants constants) {
        this.restTemplate = restTemplateBuilder.errorHandler(new ErrorHandler()).build();
        this.constants = constants;
    }

    public String getBearerTokenHeader() {
        return ((ServletRequestAttributes) RequestContextHolder.
                getRequestAttributes()).getRequest().getHeader("Authorization");
    }

    @Override
    public AllInvitedResponse getAllInvited() {
        final String invitedUrl = constants.getInvitedUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", getBearerTokenHeader());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<AllInvitedResponse> responseEntity = restTemplate.exchange(invitedUrl, HttpMethod.GET,
                entity, AllInvitedResponse.class);

        return responseEntity.getBody();
    }

    @Override
    public AllInviteesResponse getAllInvitees() {
        final String inviteesUrl = constants.getInviteesUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", getBearerTokenHeader());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<AllInviteesResponse> responseEntity = restTemplate.exchange(inviteesUrl, HttpMethod.GET,
                entity, AllInviteesResponse.class);

        return responseEntity.getBody();
    }

    @Override
    public void invite(String id) {
        final String inviteUrl = constants.getInviteUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", getBearerTokenHeader());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        restTemplate.postForObject(inviteUrl.concat(id), entity, String.class);
    }

    @Override
    public ResponseEntity<String> deleteInvitation(String id) {
        final String inviteUrl = constants.getInviteUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", getBearerTokenHeader());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(inviteUrl.concat(id), HttpMethod.DELETE,
                entity, String.class);

        return responseEntity;
    }

    @Override
    public ResponseEntity<String> accept(String id) {
        final String acceptUrl = constants.getAcceptUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", getBearerTokenHeader());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(acceptUrl.concat(id), HttpMethod.POST,
                entity, String.class);

        return responseEntity;
    }

    @Override
    public ResponseEntity<String> reject(String id) {
        final String rejectUrl = constants.getRejectUrl();
        HttpHeaders headers = constants.getBasicHeaders();
        headers.set("Authorization", getBearerTokenHeader());
        HttpEntity<String> entity = new HttpEntity<>(headers);

        ResponseEntity<String> responseEntity = restTemplate.exchange(rejectUrl.concat(id), HttpMethod.POST,
                entity, String.class);

        return responseEntity;
    }
}
