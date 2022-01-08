import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { ProfileCard } from "../../../components/profileCard";
import { InviteWithInvitee } from "@store/api/types";
import { useDeleteInviteMutation } from "@store/api";

const InvitedCard = ({ invitation }: { invitation: InviteWithInvitee }) => {
  const [deleteInvite, { isLoading }] = useDeleteInviteMutation();

  return (
    <ProfileCard user={invitation.invitee}>
      <Button
        colorScheme="red"
        variant="outline"
        leftIcon={<DeleteIcon />}
        onClick={() => deleteInvite({ id: invitation.invitationId })}
        isLoading={isLoading}
      >
        Delete
      </Button>
    </ProfileCard>
  );
};

export { InvitedCard };
