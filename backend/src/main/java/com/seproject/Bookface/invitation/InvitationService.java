package com.seproject.Bookface.invitation;

import com.seproject.Bookface.invitation.dto.response.AllInvitedResponse;
import com.seproject.Bookface.invitation.dto.response.AllInviteesResponse;
import org.springframework.http.ResponseEntity;

public interface InvitationService {

    AllInvitedResponse getAllInvited();

    AllInviteesResponse getAllInvitees();

    void invite(String id);

    ResponseEntity<String> deleteInvitation(String id);

    ResponseEntity<String> accept(String id);

    ResponseEntity<String> reject(String id);

}
