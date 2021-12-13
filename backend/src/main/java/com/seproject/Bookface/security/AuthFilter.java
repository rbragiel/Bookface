package com.seproject.Bookface.security;

import com.seproject.Bookface.user.UserServiceImpl;
import com.seproject.Bookface.user.dto.response.MeResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.security.authentication.AuthenticationManager;
import org.springframework.security.authentication.UsernamePasswordAuthenticationToken;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.web.authentication.www.BasicAuthenticationFilter;

import javax.servlet.FilterChain;
import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.util.ArrayList;
import java.util.Optional;

@Slf4j
public class AuthFilter extends BasicAuthenticationFilter {

    private final UserServiceImpl userServiceImpl;

    public AuthFilter(AuthenticationManager authenticationManager, UserServiceImpl userServiceImpl) {
        super(authenticationManager);
        this.userServiceImpl = userServiceImpl;
    }

    @Override
    protected void doFilterInternal(HttpServletRequest request, HttpServletResponse response,
                                    FilterChain filterChain) throws IOException, ServletException {
        handleAuth(request).ifPresent(authentication -> SecurityContextHolder.getContext().setAuthentication(authentication));
        filterChain.doFilter(request, response);
    }

    private Optional<UsernamePasswordAuthenticationToken> handleAuth(HttpServletRequest request) {
        final String token = request.getHeader("Authorization");
        if (token != null && token.startsWith("Bearer")) {
            try {
                MeResponse me = userServiceImpl.me(token);
                return Optional.of(new UsernamePasswordAuthenticationToken(me, null, new ArrayList<>()));
            } catch (Exception e) {
                log.info("Authorization went wrong");
                return Optional.empty();
            }
        }
        log.info("Token is missing or wrong token");
        return Optional.empty();
    }
}
