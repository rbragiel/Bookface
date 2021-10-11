package com.seproject.Bookface.model.dto.request;

import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
public class CreateUserRequest {

    private Long id;
    private String firstName;
    private String lastName;
    private String email;
    private String description;
    private String birthday;
}
