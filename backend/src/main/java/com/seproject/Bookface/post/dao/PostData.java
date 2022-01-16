package com.seproject.Bookface.post.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.*;
import org.hibernate.annotations.CascadeType;

import javax.persistence.*;
import javax.persistence.Entity;
import java.sql.Timestamp;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
public class PostData {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "post_id", nullable = false)
    @Cascade(CascadeType.ALL)
    private String postId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "content")
    private String content;

    @Column(name = "title", nullable = false)
    private String title;

    @Column(name = "timestamp", nullable = false)
    private Timestamp timestamp;

    @Column(name = "image_url")
    private String imageUrl;

}