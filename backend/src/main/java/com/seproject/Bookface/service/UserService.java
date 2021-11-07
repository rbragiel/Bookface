package com.seproject.Bookface.service;

import com.seproject.Bookface.model.dao.UserEntity;
import com.seproject.Bookface.model.dto.User;
import org.mapstruct.factory.Mappers;
import com.seproject.Bookface.model.dto.request.CreateUserRequest;
import com.seproject.Bookface.model.dto.response.GetUsersResponse;
import com.seproject.Bookface.repository.RelationshipRepository;
import com.seproject.Bookface.repository.UserRepository;
import com.seproject.Bookface.service.mapper.UserMapper;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RelationshipRepository relationshipRepository;
    private UserMapper mapper = Mappers.getMapper(UserMapper.class);

    @Autowired
    public UserService(UserRepository userRepository, RelationshipRepository relationshipRepository){
        this.userRepository = userRepository;
        this.relationshipRepository = relationshipRepository;
    }

    public void saveUser(CreateUserRequest userEntity) {
        UserEntity toSave = mapper.mapToUserEntity(userEntity);

        userRepository.save(toSave);
    }

    public GetUsersResponse getAllUsers() {
        List<UserEntity> allUsers = userRepository.findAll();
        return GetUsersResponse
                .builder()
                    .users(allUsers.stream()
                        .map(userEntity -> mapper.mapToUser(userEntity))
                        .collect(Collectors.toList()))
                .build();
    }

    public User getUser(Long id) {
        UserEntity userEntity = userRepository.getById(id);

        return mapper.mapToUser(userEntity);
    }
    /*
    public void addRelationship() {
        RelationshipEntity relationshipEntity = RelationshipEntity.builder()
                .date("slsada")
                .userOneId(1L)
                .userTwoId(2L)
                .status(-1)
                .build();
        relationshipRepository.save(relationshipEntity);
    }*/

    public GetUsersResponse getAllFriendsOf(Long id) {
        List<UserEntity> friends = userRepository.findAllById(relationshipRepository.getAllFriendsOf(id));

        return GetUsersResponse
                .builder()
                    .users(friends.stream()
                        .map(userEntity -> mapper.mapToUser(userEntity))
                    .collect(Collectors.toList()))
                .build();
    }
}
