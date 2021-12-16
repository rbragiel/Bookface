package com.seproject.Bookface.error;

import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.ToString;

@AllArgsConstructor
@Data
@ToString
public class AuthErrorResponse<T> {
    private T message;
    private int statusCode;
}
