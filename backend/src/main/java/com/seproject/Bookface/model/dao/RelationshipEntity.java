package com.seproject.Bookface.model.dao;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.util.Set;

@Entity
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
@Table(name = "relationships")
public class RelationshipEntity {

    @Id
    @SequenceGenerator(name="rel_seq",sequenceName="relationship_seq")
    @GeneratedValue(strategy=GenerationType.SEQUENCE, generator="rel_seq")
    @Column(name = "id")
    private Long id;

    @Column(name = "user_one_id")
    private Long userOneId;

    @Column(name = "user_two_id")
    private Long userTwoId;

    @Column(name = "date")
    private String date;

    @Column(name = "status")
    private int status;

}
