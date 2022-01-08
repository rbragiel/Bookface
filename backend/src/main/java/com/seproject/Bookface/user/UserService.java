package com.seproject.Bookface.user;

import com.seproject.Bookface.user.dto.request.ActivateRequest;
import com.seproject.Bookface.user.dto.request.CreateUserRequest;
import com.seproject.Bookface.user.dto.request.LoginRequest;
import com.seproject.Bookface.user.dto.response.*;
import org.springframework.http.ResponseEntity;

public interface UserService {

    RegisterResponse register(CreateUserRequest requestBody);

    LoginResponse login(LoginRequest requestBody);

    LoginResponse activate(ActivateRequest token);

    MeResponse me(String token);

    ResponseEntity<SearchResponse> search(String query, int page);

    ResponseEntity<GetUserResponse> getUser(String userId);
}
