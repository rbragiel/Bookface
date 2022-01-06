package com.seproject.Bookface.post;

import com.seproject.Bookface.post.dao.PostEntity;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;

@Repository
public interface PostRepository extends JpaRepository<PostEntity, String> {

    Page<PostEntity> findAllByUserIdOrderByTimestampDesc(String userId, Pageable paging);

    @Transactional
    @Modifying
    @Query("UPDATE PostEntity post SET post.title = ?2, post.content = ?3 WHERE post.postId = ?1")
    void setUserInfoById(String postId, String title, String content);


    @Query("SELECT u FROM PostEntity u WHERE u.postId = :postId")
    PostEntity getPostEntityByPostId(@Param("postId") String postId);

}
