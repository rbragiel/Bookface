import React from "react";
import { Center, Box, Wrap } from "@chakra-ui/react";
import { AppSpinner } from "@components/spinner";
import { useGetAllInviteesQuery } from "@store/api";
import { useTranslation } from "react-i18next";
import { InviteeCard } from "./inviteeCard";

const centerPostQuantity = 2;

const Invitees = () => {
  const { data, isLoading, error } = useGetAllInviteesQuery();
  const { t } = useTranslation();

  if (isLoading) {
    return (
      <Center flex={1}>
        <AppSpinner />
      </Center>
    );
  }

  if (error) {
    return <Center flex={1}>{JSON.stringify(error)}</Center>;
  }

  if (data && data.invitees.length > 0) {
    return (
      <Wrap
        spacing={2}
        paddingY={4}
        w="100%"
        justify={data.invitees.length > centerPostQuantity ? "center" : "start"}
      >
        {data.invitees.map((invitation) => (
          <InviteeCard key={invitation.invitationId} invitation={invitation} />
        ))}
      </Wrap>
    );
  } else {
    return (
      <Center flex={1}>
        <Box>{t("You don't have any new invites.")}</Box>
      </Center>
    );
  }
};

export { Invitees };
