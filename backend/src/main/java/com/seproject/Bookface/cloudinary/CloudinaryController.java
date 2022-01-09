package com.seproject.Bookface.cloudinary;

import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.multipart.MultipartFile;

@RestController
@RequestMapping(path = "/items")
@Slf4j
@AllArgsConstructor
public class CloudinaryController {

    private final CloudinaryServiceImpl cloudinaryService;

    @PostMapping(path = "/upload", consumes = "multipart/form-data")
    public ResponseEntity<String> upload(@RequestHeader(HttpHeaders.AUTHORIZATION) String accessToken,
                                                       @RequestParam("file") MultipartFile file, @RequestParam("resource") String resourceId) {
        return cloudinaryService.upload(accessToken, file, resourceId);
    }

    @GetMapping(path = "/download/{publicId}")
    public ResponseEntity<ByteArrayResource>  download(@PathVariable("publicId") String publicId) {

        return cloudinaryService.downloadImg(publicId);

    }


}
