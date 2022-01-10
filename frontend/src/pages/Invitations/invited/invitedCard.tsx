import React from "react";
import { DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { ProfileCard } from "../../../components/profileCard";
import { InviteWithInvitee } from "@store/api/types";
import { useDeleteInviteMutation } from "@store/api";
import { useTranslation } from "react-i18next";

const InvitedCard = ({ invitation }: { invitation: InviteWithInvitee }) => {
  const [deleteInvite, { isLoading }] = useDeleteInviteMutation();
  const { t } = useTranslation();
  return (
    <ProfileCard user={invitation.invitee}>
      <Button
        colorScheme="red"
        variant="outline"
        leftIcon={<DeleteIcon />}
        onClick={() => deleteInvite({ id: invitation.invitationId })}
        isLoading={isLoading}
      >
        {t("Delete")}
      </Button>
    </ProfileCard>
  );
};

export { InvitedCard };
