package com.seproject.Bookface.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.seproject.Bookface.resource.ImageRelationService;
import com.seproject.Bookface.resource.ImageRelationServiceImpl;
import com.seproject.Bookface.user.UserServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.core.io.ByteArrayResource;
import org.springframework.http.HttpHeaders;
import org.springframework.http.HttpStatus;
import org.springframework.http.MediaType;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.InputStream;
import java.net.URL;
import java.util.Map;

@AllArgsConstructor
@Service
@Slf4j
public class CloudinaryServiceImpl {

    private final Cloudinary cloudinary;
    private final UserServiceImpl userService;
    private final ImageRelationServiceImpl imageRelationService;

    public ResponseEntity<String> upload(String accessToken, MultipartFile file, String resourceId) {
        String user = userService.me(accessToken).getUserId();
        if (user != null) {
            try {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                String publicId = uploadResult.get("public_id").toString();
                imageRelationService.addImageToResource(resourceId, publicId);
                return new ResponseEntity<>(publicId, HttpStatus.OK);
            } catch (Exception ex) {
                log.error(ex.getMessage());
                return new ResponseEntity<>(ex.getMessage(), HttpStatus.BAD_REQUEST);
            }
        } else {
            log.error("User is not authenticated");
            return new ResponseEntity<>(null, HttpStatus.UNAUTHORIZED);
        }
    }

    public ResponseEntity<ByteArrayResource> downloadImg(String publicId) {
        String cloudUrl = cloudinary.url().secure(true).format("jpg")
                .publicId(publicId)
                .generate();

        try {
            URL url = new URL(cloudUrl);
            InputStream inputStream = url.openStream();
            byte[] out = org.apache.commons.io.IOUtils.toByteArray(inputStream);
            ByteArrayResource resource = new ByteArrayResource(out);

            HttpHeaders responseHeaders = new HttpHeaders();
            responseHeaders.add("content-disposition", "attachment; filename=image.jpg");
            responseHeaders.add("Content-Type", "image/jpeg");

            return ResponseEntity.ok()
                    .headers(responseHeaders)
                    .contentLength(out.length)
                    .body(resource);

        } catch (Exception ex) {
            log.error(ex.getMessage());
            return null;
        }
    }

}
