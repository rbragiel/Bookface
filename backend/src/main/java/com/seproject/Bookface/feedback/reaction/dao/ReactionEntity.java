package com.seproject.Bookface.feedback.reaction.dao;

import com.seproject.Bookface.post.dao.PostEntity;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;

import javax.persistence.*;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
public class ReactionEntity {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "reaction_id", nullable = false)
    private String reactionId;

    @ManyToOne
    @JoinColumn(name = "post_id", nullable = false)
    private PostEntity postId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "choice", nullable = false)
    private String choice;

}
