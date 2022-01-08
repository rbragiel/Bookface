package com.seproject.Bookface.invitation.dao;

import com.fasterxml.jackson.annotation.JsonIgnoreProperties;
import com.fasterxml.jackson.annotation.JsonProperty;
import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Data;
import lombok.NoArgsConstructor;

@Builder
@Data
@AllArgsConstructor
@NoArgsConstructor
@JsonIgnoreProperties(ignoreUnknown = true)
public class InviteeEntity {
    @JsonProperty("invitationId")
    String invitationId;

    @JsonProperty("inviter")
    Invitee inviter;
}
