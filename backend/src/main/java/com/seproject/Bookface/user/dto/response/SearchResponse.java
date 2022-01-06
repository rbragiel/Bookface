package com.seproject.Bookface.user.dto.response;

import com.seproject.Bookface.user.dao.UserEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@Data
@AllArgsConstructor
@NoArgsConstructor
@ToString
public class SearchResponse {

    List<UserEntity> users;

}
