package com.seproject.Bookface.invitation;

import com.seproject.Bookface.invitation.dto.response.AllInvitedResponse;
import com.seproject.Bookface.invitation.dto.response.AllInviteesResponse;
import lombok.extern.slf4j.Slf4j;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;
import org.springframework.web.client.HttpClientErrorException;
import org.springframework.web.server.ResponseStatusException;

@CrossOrigin
@RestController
@RequestMapping(path = "/invitations")
@Slf4j
public class InvitationController {

    private final InvitationServiceImpl invitationServiceImpl;

    public InvitationController(InvitationServiceImpl invitationService) {
        this.invitationServiceImpl = invitationService;
    }

    @GetMapping(path = "/all/invited")
    public ResponseEntity<AllInvitedResponse> allInvited() {
        try {
            AllInvitedResponse allInvitedResponse = invitationServiceImpl.getAllInvited();
            log.info("Got all invitations");
            return new ResponseEntity<>(allInvitedResponse, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @GetMapping(path = "/all/invitees")
    public ResponseEntity<AllInviteesResponse> allInvitees() {
        try {
            AllInviteesResponse allInviteesResponse = invitationServiceImpl.getAllInvitees();
            log.info("Got all invitations");
            return new ResponseEntity<>(allInviteesResponse, HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @PostMapping(path = "/invite/{id}")
    public ResponseEntity<String> invite(@PathVariable String id) {
        try {
            invitationServiceImpl.invite(id);
            log.info("User successfully invited");
            return new ResponseEntity<>("User successfully invited", HttpStatus.OK);
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @DeleteMapping(path = "/invite/{id}")
    public ResponseEntity<String> delete(@PathVariable String id) {
        try {
            ResponseEntity<String> responseEntity = invitationServiceImpl.deleteInvitation(id);
            log.info("Invitation succesfully deleted");
            return responseEntity;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @PostMapping(path = "/accept/{id}")
    public ResponseEntity<String> accept(@PathVariable String id) {
        try {
            ResponseEntity<String> responseEntity = invitationServiceImpl.accept(id);
            log.info("Invitation accepted");
            return responseEntity;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

    @PostMapping(path = "/reject/{id}")
    public ResponseEntity<String> reject(@PathVariable String id) {
        try {
            ResponseEntity<String> responseEntity = invitationServiceImpl.reject(id);
            log.info("Invitation rejected");
            return responseEntity;
        } catch (HttpClientErrorException exception) {
            log.info(exception.toString());
            throw new ResponseStatusException(exception.getStatusCode(), exception.getMessage());
        }
    }

}
