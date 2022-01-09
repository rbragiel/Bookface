package com.seproject.Bookface.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.seproject.Bookface.resource.ImageRelationService;
import com.seproject.Bookface.resource.ImageRelationServiceImpl;
import com.seproject.Bookface.user.UserServiceImpl;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.util.Map;

@AllArgsConstructor
@Service
@Slf4j
public class CloudinaryServiceImpl {

    private final Cloudinary cloudinary;
    private final UserServiceImpl userService;
    private final ImageRelationServiceImpl imageRelationService;

    public String upload(String accessToken, MultipartFile file, String resourceId) {
        String user = userService.me(accessToken).getUserId();
        if (user != null) {
            try {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                String publicId = uploadResult.get("public_id").toString();
                log.info("The user " + user + " successfully uploaded the file: " + publicId);
                imageRelationService.addImageToResource(resourceId, publicId);

                return publicId;
            } catch (Exception ex) {
                log.error("The user " + user + " failed to load to Cloudinary the image file: " + file.getName());
                log.error(ex.getMessage());
                return null;
            }
        } else {
            log.error("Error: a not authenticated user tried to upload a file");
            return null;
        }
    }

    public ResponseEntity<String> downloadImg(String publicId) {
        String cloudUrl = cloudinary.url().secure(true)
                .publicId(publicId)
                .generate();
        return new ResponseEntity<>(cloudUrl, HttpStatus.OK);
    }

}
