package com.seproject.Bookface.model.dao;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.seproject.Bookface.model.Role;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

import javax.persistence.*;
import java.time.LocalDate;
import java.util.List;
import java.util.Set;

@Entity
@Table(name = "users")
@Data
@NoArgsConstructor
@AllArgsConstructor
@Builder
public class UserEntity {

    @Id
    @GeneratedValue
    @Column(name = "id")
    private Long id;

    @Column(name = "first_name")
    private String firstName;

    @Column(name = "last_name")
    private String lastName;

    @Column(name = "email")
    private String email;

    @Column(name = "description")
    private String description; /* profile desc */

    @Column(name = "birthday")
    private String birthday; /* later change to proper date */
/*
    @Column(name = "role")
    private Role role;

    @Column(name = "join_date")
    private LocalDate joinDate;
*/
    @OneToMany
    private Set<RelationshipEntity> relations;

}
