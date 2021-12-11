package com.seproject.Bookface.model.dto;

import lombok.Builder;
import lombok.Getter;

import java.sql.Date;

@Getter
@Builder
public class User {

    private String firstName;
    private String lastName;
    private String profileDescription;
    private String avatarURL;
    private Date birthday;
    private Date joinDate;

}
