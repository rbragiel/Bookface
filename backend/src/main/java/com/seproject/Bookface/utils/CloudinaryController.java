package com.seproject.Bookface.utils;

import com.seproject.Bookface.user.UserServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpHeaders;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

import java.io.IOException;

@RestController
@RequestMapping(path = "/items")
@Slf4j
@AllArgsConstructor
public class CloudinaryController {

    private final CloudinaryServiceImpl cloudinaryService;

    @PostMapping(path = "/upload", consumes = "multipart/form-data")
    public @ResponseBody String upload(@RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken, @RequestParam("file") MultipartFile file) {
        return cloudinaryService.upload(accessToken, file);
    }


}
