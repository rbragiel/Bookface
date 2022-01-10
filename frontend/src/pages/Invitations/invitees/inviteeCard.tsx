import React from "react";
import { AddIcon, DeleteIcon } from "@chakra-ui/icons";
import { Button } from "@chakra-ui/react";
import { useAcceptMutation, useRejectMutation } from "@store/api";
import { InviteWithInviter } from "@store/api/types";
import { ProfileCard } from "../../../components/profileCard";
import { useTranslation } from "react-i18next";

const InviteeCard = ({ invitation }: { invitation: InviteWithInviter }) => {
  const [accept, { isLoading: isAcceptLoading }] = useAcceptMutation();
  const [reject, { isLoading: isRejectLoading }] = useRejectMutation();
  const { t } = useTranslation();
  return (
    <ProfileCard user={invitation.inviter}>
      <Button
        colorScheme="teal"
        leftIcon={<AddIcon />}
        onClick={() => accept({ id: invitation.invitationId })}
        isLoading={isAcceptLoading && isRejectLoading}
      >
        {t("Add")}
      </Button>
      <Button
        colorScheme="red"
        leftIcon={<DeleteIcon />}
        variant="outline"
        onClick={() => reject({ id: invitation.invitationId })}
        isLoading={isAcceptLoading && isRejectLoading}
      >
        {t("Delete")}
      </Button>
    </ProfileCard>
  );
};

export { InviteeCard };
