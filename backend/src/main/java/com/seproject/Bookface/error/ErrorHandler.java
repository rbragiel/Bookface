package com.seproject.Bookface.error;

import com.google.gson.Gson;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.client.ClientHttpResponse;
import org.springframework.web.client.DefaultResponseErrorHandler;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.client.HttpStatusCodeException;

import java.io.BufferedReader;
import java.io.IOException;
import java.io.InputStreamReader;
import java.util.stream.Collectors;

@Slf4j
public class ErrorHandler extends DefaultResponseErrorHandler {

    private Gson gson;

    public ErrorHandler() {
        this.gson = new Gson();
    }

    private void handle4xxError(ClientHttpResponse response) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(response.getBody()))) {
            String httpBodyResponse = reader.lines().collect(Collectors.joining(""));
            log.info(httpBodyResponse);
            AuthErrorResponse authErrorResponse = gson.fromJson(httpBodyResponse, AuthErrorResponse.class);
            throw HttpClientErrorException.create(authErrorResponse.getMessage(), response.getStatusCode(), response.getStatusText(), response.getHeaders(), null, null);
        }
    }

    private void handle5xxError(ClientHttpResponse response) throws IOException {
        try (BufferedReader reader = new BufferedReader(new InputStreamReader(response.getBody()))) {
            String httpBodyResponse = reader.lines().collect(Collectors.joining(""));
            throw new HttpClientErrorException(response.getStatusCode(), httpBodyResponse);
        }
    }

    @Override
    public void handleError(ClientHttpResponse response) throws IOException {
        if (response.getStatusCode().is4xxClientError()) {
            log.info("Handling 4xx response");
            handle4xxError(response);
        }
        if (response.getStatusCode().is5xxServerError()) {
            log.info("Handling 4xx response");
            handle5xxError(response);
        }
    }
}
