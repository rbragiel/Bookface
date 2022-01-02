package com.seproject.Bookface.user;

import com.seproject.Bookface.user.dto.request.ActivateRequest;
import com.seproject.Bookface.user.dto.request.CreateUserRequest;
import com.seproject.Bookface.user.dto.request.LoginRequest;
import com.seproject.Bookface.user.dto.response.LoginResponse;
import com.seproject.Bookface.user.dto.response.MeResponse;
import com.seproject.Bookface.user.dto.response.RegisterResponse;

public interface UserService {

    RegisterResponse register(CreateUserRequest requestBody);

    LoginResponse login(LoginRequest requestBody);

    LoginResponse activate(ActivateRequest token);

    MeResponse me(String token);

}
