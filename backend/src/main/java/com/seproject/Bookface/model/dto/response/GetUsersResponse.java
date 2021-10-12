package com.seproject.Bookface.model.dto.response;

import com.seproject.Bookface.model.dto.User;

import lombok.Builder;
import lombok.Getter;

import java.util.List;

@Getter
@Builder
public class GetUsersResponse {

    private List<User> users;
}
