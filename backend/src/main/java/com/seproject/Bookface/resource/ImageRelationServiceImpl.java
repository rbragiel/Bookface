package com.seproject.Bookface.resource;

import com.seproject.Bookface.resource.dao.ImageRelationEntity;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

@Service
@RequiredArgsConstructor
public class ImageRelationServiceImpl implements ImageRelationService {

    private final ImageRelationRepository imageRelationRepository;

    public void addImageToResource(String resourceId, String publicId) {

        imageRelationRepository.save(ImageRelationEntity.builder()
            .publicId(publicId)
            .resourceId(resourceId)
            .build());

    }

}
