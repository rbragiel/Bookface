package com.seproject.Bookface.error;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@AllArgsConstructor
@Data
@ToString
public class AuthErrorResponse {
    private String message;
    private int statusCode;
}
