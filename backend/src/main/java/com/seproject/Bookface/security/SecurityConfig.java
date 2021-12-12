package com.seproject.Bookface.security;

import com.seproject.Bookface.user.UserServiceImpl;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;
import org.springframework.security.config.annotation.authentication.builders.AuthenticationManagerBuilder;
import org.springframework.security.config.annotation.web.builders.HttpSecurity;
import org.springframework.security.config.annotation.web.configuration.EnableWebSecurity;
import org.springframework.security.config.annotation.web.configuration.WebSecurityConfigurerAdapter;
import org.springframework.security.config.http.SessionCreationPolicy;

@EnableWebSecurity
@Configuration
public class SecurityConfig extends WebSecurityConfigurerAdapter {

    private final UserServiceImpl userServiceImpl;
    private final AuthEntryPoint authEntryPoint;

    @Autowired
    public SecurityConfig(UserServiceImpl userServiceImpl,
                          AuthEntryPoint authEntryPoint) {
        this.userServiceImpl = userServiceImpl;
        this.authEntryPoint = authEntryPoint;
    }


    @Override
    protected void configure(HttpSecurity http) throws Exception {
        http.cors().and().csrf().disable().formLogin().disable()
                .exceptionHandling().authenticationEntryPoint(authEntryPoint)
                .and()
                .sessionManagement().sessionCreationPolicy(SessionCreationPolicy.STATELESS)
                .and()
                .addFilter(authFilter())
                .authorizeRequests()
                .antMatchers("/user/login", "/user/register", "/user/activate/{token}", "/health").permitAll()
                .anyRequest().authenticated();
    }

    @Bean
    public AuthFilter authFilter() throws Exception {
        return new AuthFilter(authenticationManager(), userServiceImpl);
    }
}
