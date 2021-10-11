package com.seproject.Bookface.model.dto;

import lombok.Builder;
import lombok.Getter;

@Getter
@Builder
public class User {

    private Long id;
    private String firstName;
    private String lastName;
    private String description;
    private String birthday;
}
