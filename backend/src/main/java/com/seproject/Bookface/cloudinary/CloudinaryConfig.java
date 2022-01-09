package com.seproject.Bookface.cloudinary;

import com.cloudinary.Cloudinary;
import com.cloudinary.utils.ObjectUtils;
import com.seproject.Bookface.contants.Constants;
import lombok.AllArgsConstructor;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@Configuration
@AllArgsConstructor
public class CloudinaryConfig {

    private final Constants constants;

    @Bean
    public Cloudinary getCloudinary() {
        return new Cloudinary(ObjectUtils.asMap(
                "cloud_name", constants.getCloudinaryCloudName(),
                "api_key", constants.getCloudinaryApiKey(),
                "api_secret", constants.getCloudinaryApiSecret()));
    }
}
