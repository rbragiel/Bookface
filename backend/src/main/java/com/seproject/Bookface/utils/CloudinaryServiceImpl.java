package com.seproject.Bookface.utils;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.seproject.Bookface.user.UserServiceImpl;
import com.seproject.Bookface.user.dao.UserEntity;
import lombok.AllArgsConstructor;
import lombok.extern.slf4j.Slf4j;
import org.springframework.stereotype.Service;
import org.springframework.web.multipart.MultipartFile;

import java.io.File;
import java.io.IOException;
import java.util.Map;

@AllArgsConstructor
@Service
@Slf4j
public class CloudinaryServiceImpl {

    private final Cloudinary cloudinary;
    private final UserServiceImpl userService;

    public String upload(String accessToken, MultipartFile file) {
        String user = userService.me(accessToken).getUserId();
        if (user != null) {
            try {
                Map uploadResult = cloudinary.uploader().upload(file.getBytes(), ObjectUtils.emptyMap());
                String publicId = uploadResult.get("public_id").toString();
                log.info("The user " + user + " successfully uploaded the file: " + publicId);
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
}
