package com.seproject.Bookface.model.dto.request;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.ToString;

@Getter
@ToString
@AllArgsConstructor
public class ActivateRequest {

    private String token;

}
