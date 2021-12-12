package com.seproject.Bookface.contants;

import lombok.NoArgsConstructor;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;

@NoArgsConstructor
@Component
final public class Constants {
    private final String registerUrl = "/register";
    private final String loginUrl = "/login";
    private final String activateUrl = "/activate";
    private final String meUrl = "/me";
    @Value("${auth.url}")
    private String authUrl;

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
}
