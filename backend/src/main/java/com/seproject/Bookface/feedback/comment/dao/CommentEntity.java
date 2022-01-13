package com.seproject.Bookface.feedback.comment.dao;

import com.seproject.Bookface.post.dao.PostEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;
import java.sql.Timestamp;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
public class CommentEntity {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "comment_id", nullable = false)
    private String commentId;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private PostEntity postId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "content", nullable = false)
    private String content;

    @Column(name = "date", nullable = false)
    private Timestamp date;
}

