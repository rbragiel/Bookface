package com.seproject.Bookface.service.mapper;

import com.seproject.Bookface.model.dao.UserEntity;
import com.seproject.Bookface.model.dto.User;
import com.seproject.Bookface.model.dto.request.CreateUserRequest;
import org.mapstruct.Mapper;

@Mapper
public interface UserMapper {

    UserEntity mapToUserEntity(CreateUserRequest createUserRequest);
    User mapToUser(UserEntity userEntity);

}
