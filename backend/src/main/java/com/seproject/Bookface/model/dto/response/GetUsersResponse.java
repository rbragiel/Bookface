package com.seproject.Bookface.model.dto.response;

import com.seproject.Bookface.model.dto.User;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.NoArgsConstructor;

import java.util.List;

@Getter
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class GetUsersResponse {

    private List<User> users;
}
