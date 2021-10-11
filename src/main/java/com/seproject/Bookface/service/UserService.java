package com.seproject.Bookface.service;

import com.seproject.Bookface.model.dao.RelationshipEntity;
import com.seproject.Bookface.model.dao.UserEntity;
import com.seproject.Bookface.model.dto.User;
import com.seproject.Bookface.model.dto.request.AddFriendRequest;
import com.seproject.Bookface.model.dto.request.CreateUserRequest;
import com.seproject.Bookface.model.dto.response.GetUsersResponse;
import com.seproject.Bookface.repository.RelationshipRepository;
import com.seproject.Bookface.repository.UserRepository;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;


import javax.management.relation.Relation;
import java.util.List;
import java.util.stream.Collectors;

@Service
public class UserService {

    private final UserRepository userRepository;
    private final RelationshipRepository relationshipRepository;

    @Autowired
    public UserService(UserRepository userRepository, RelationshipRepository relationshipRepository){
        this.userRepository = userRepository;
        this.relationshipRepository = relationshipRepository;
    }

    public void saveUser(CreateUserRequest userEntity) {
        UserEntity toSave = UserEntity.builder()
                .firstName(userEntity.getFirstName())
                .lastName(userEntity.getLastName())
                .email(userEntity.getEmail())
                .description(userEntity.getDescription())
                .birthday(userEntity.getBirthday())
                .build();

        userRepository.save(toSave);
    }

    public GetUsersResponse getAllUsers() {
        List<UserEntity> allUsers = userRepository.findAll();
        return GetUsersResponse
                .builder()
                    .users(allUsers.stream()
                        .map(userEntity -> User.builder()
                            .id(userEntity.getId())
                            .firstName(userEntity.getFirstName())
                            .lastName(userEntity.getLastName())
                            .birthday(userEntity.getBirthday())
                            .description(userEntity.getDescription())
                            .build())
                        .collect(Collectors.toList()))
                .build();
    }

    public User getUser(Long id) {
        UserEntity userEntity = userRepository.getById(id);

        return User.builder()
                .id(userEntity.getId())
                .description(userEntity.getDescription())
                .birthday(userEntity.getBirthday())
                .lastName(userEntity.getLastName())
                .firstName(userEntity.getFirstName())
                .build();
    }
    public void addRelationship() {
        RelationshipEntity relationshipEntity = RelationshipEntity.builder()
                .date("slsada")
                .userOneId(1L)
                .userTwoId(2L)
                .status(-1)
                .build();
        relationshipRepository.save(relationshipEntity);
    }

    public GetUsersResponse getAllFriendsOf(Long id) {
        List<UserEntity> friends = userRepository.findAllById(relationshipRepository.getAllFriendsOf(id));

        return GetUsersResponse
                .builder()
                .users(friends.stream()
                        .map(userEntity -> User.builder()
                                .id(userEntity.getId())
                                .firstName(userEntity.getFirstName())
                                .lastName(userEntity.getLastName())
                                .birthday(userEntity.getBirthday())
                                .description(userEntity.getDescription())
                                .build())
                        .collect(Collectors.toList()))
                .build();

    }

}
