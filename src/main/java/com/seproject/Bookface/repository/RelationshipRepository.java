package com.seproject.Bookface.repository;

import com.seproject.Bookface.model.dao.RelationshipEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import java.util.List;

@Repository
public interface RelationshipRepository extends JpaRepository<RelationshipEntity, Long> {

    @Query(value = "SELECT IF(user_one_id != :id, user_one_id, user_two_id) FROM relationships WHERE user_one_id = :id or user_two_id = :id", nativeQuery = true)
    List<Long> getAllFriendsOf(@Param("id") Long id);

}
