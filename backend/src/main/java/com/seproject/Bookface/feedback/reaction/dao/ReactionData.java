package com.seproject.Bookface.feedback.reaction.dao;

import com.seproject.Bookface.feedback.reaction.Choice;
import com.seproject.Bookface.post.dao.PostData;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;
import org.hibernate.annotations.DynamicUpdate;
import org.hibernate.annotations.GenericGenerator;
import org.hibernate.annotations.OnDelete;
import org.hibernate.annotations.OnDeleteAction;

import javax.persistence.*;

@Entity
@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@DynamicUpdate
public class ReactionData {

    @Id
    @GeneratedValue(generator = "system-uuid")
    @GenericGenerator(name = "system-uuid", strategy = "uuid")
    @Column(name = "reaction_id", nullable = false)
    private String reactionId;

    @Column(name = "post_id", nullable = false)
    private String postId;

    @Column(name = "user_id", nullable = false)
    private String userId;

    @Column(name = "choice", nullable = false)
    @Enumerated(EnumType.STRING)
    private Choice choice;

}
