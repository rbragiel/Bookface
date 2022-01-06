package com.seproject.Bookface.invitation.dto.response;

import com.fasterxml.jackson.annotation.JsonProperty;
import com.seproject.Bookface.invitation.dao.InvitedEntity;
import lombok.AllArgsConstructor;
import lombok.Data;
import lombok.NoArgsConstructor;
import lombok.ToString;

import java.util.List;

@AllArgsConstructor
@NoArgsConstructor
@Data
@ToString
public class AllInviteesResponse {

    @JsonProperty("invitees")
    List<InvitedEntity> invitedEntity;

}
