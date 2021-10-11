package com.seproject.Bookface.model.dto.request;

import lombok.Getter;
import lombok.ToString;

import java.time.LocalDate;

// TODO
@Getter
@ToString
public class AddFriendRequest {

    private Long userOneId;
    private Long userTwoId;
    private int status;
    private LocalDate date;
}
