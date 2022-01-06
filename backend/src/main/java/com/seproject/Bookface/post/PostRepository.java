package com.seproject.Bookface.post;

import com.seproject.Bookface.post.dao.PostEntity;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.ArrayList;
import java.util.Optional;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, Long> {

    Optional<ArrayList<PostEntity>> findAllByUserId(String userId);

    @Transactional
    @Modifying
    @Query("update PostEntity post set post.title = ?2, post.content = ?3 where post.postId = ?1")
    void setUserInfoById(Long postId, String title, String content);


    @Query("SELECT u FROM PostEntity u WHERE u.postId = :postId")
    PostEntity getPostEntityByPostId(@Param("postId") String postId);

}
