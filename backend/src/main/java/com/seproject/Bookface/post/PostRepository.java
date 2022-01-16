package com.seproject.Bookface.post;

import com.seproject.Bookface.post.dao.PostData;
import org.springframework.data.domain.Page;
import org.springframework.data.domain.Pageable;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Modifying;
import org.springframework.data.jpa.repository.Query;
import org.springframework.data.repository.query.Param;
import org.springframework.stereotype.Repository;

import javax.transaction.Transactional;
import java.util.List;

@Repository
public interface PostRepository extends JpaRepository<PostData, String> {

    Page<PostData> findAllByUserIdOrderByTimestampDesc(String userId, Pageable paging);
    Page<PostData> findAllByUserIdInOrderByTimestampDesc(List<String> userId, Pageable paging);

    @Transactional
    @Modifying
    @Query("UPDATE PostData post SET post.title = ?2, post.content = ?3 WHERE post.postId = ?1")
    void setUserInfoById(String postId, String title, String content);


    @Query("SELECT u FROM PostData u WHERE u.postId = :postId")
    PostData getPostEntityByPostId(@Param("postId") String postId);

}
