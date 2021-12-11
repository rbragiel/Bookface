package com.seproject.Bookface.security;

import com.seproject.Bookface.model.dto.request.LoginRequest;
import io.micrometer.core.instrument.util.StringUtils;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.boot.web.client.RestTemplateBuilder;
import org.springframework.http.*;
import org.springframework.security.authentication.AuthenticationProvider;
import org.springframework.security.authentication.BadCredentialsException;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.AuthenticationException;
import org.springframework.security.core.authority.AuthorityUtils;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestTemplate;

import java.util.Collections;

@Component
public class CustomAuthenticationProvider implements AuthenticationProvider {


    private final RestTemplate restTemplate;

    @Autowired
    public CustomAuthenticationProvider(RestTemplateBuilder restTemplateBuilder) {
        this.restTemplate = restTemplateBuilder.build();
    }


    //DO PRZEROBIENIA
    @Override
    public Authentication authenticate(Authentication authentication) throws AuthenticationException {
        UsernamePasswordAuthenticationToken token = null;
        Authentication result = null;

        token = (UsernamePasswordAuthenticationToken) authentication;

        if (token != null) {
            if (StringUtils.isNotEmpty(token.getName())) {

                LoginRequest requestBody = new LoginRequest(token.getName(), (String) token.getCredentials());

                String url = "http://localhost:5000/api/auth/me";

                HttpHeaders headers = new HttpHeaders();
                headers.setContentType(MediaType.APPLICATION_JSON);
                headers.setAccept(Collections.singletonList(MediaType.APPLICATION_JSON));

               // HttpEntity<LoginRequest> entity = new HttpEntity<>(requestBody, headers);

                ResponseEntity<String> response = restTemplate.exchange(
                        url, HttpMethod.GET, new HttpEntity(headers),
                        String.class);

               // ResponseEntity<String> response = restTemplate.getForEntity(url, String.class);
                HttpStatus status = response.getStatusCode();
                System.out.println(status);
                if (status.is2xxSuccessful()) {

                    String[] auxAuth = new String[1];
                    auxAuth[0] = "ROLE_ADMIN";
                    auxAuth[1] = "ROLE_USER";

                    result = new UsernamePasswordAuthenticationToken(
                            token.getName(), token.getCredentials(),
                            AuthorityUtils.createAuthorityList(auxAuth));
                    return result;
                } else {
                    throw new BadCredentialsException("Unauthorized. User is unauthorized to access this resource");
                }
            }
        }
        return null;
    }

    @Override
    public boolean supports(Class<?> authentication) {
        return authentication.equals(UsernamePasswordAuthenticationToken.class);
    }
}




