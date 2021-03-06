import React from "react";
import { Center, Box, Wrap, useMediaQuery } from "@chakra-ui/react";
import { useGetAllInviteesQuery } from "@store/api";
import { useTranslation } from "react-i18next";
import { InviteeCard } from "./inviteeCard";
import { FullSpaceLoader } from "@components/fullSpaceLoader";
import { Breakpoints } from "@contants/breakpoints";

const centerPostQuantity = 2;

const Invitees = () => {
  const { data, isLoading, error } = useGetAllInviteesQuery();
  const { t } = useTranslation();
  const [isXs] = useMediaQuery(Breakpoints.xs);

  if (isLoading) {
    return <FullSpaceLoader />;
  }

  if (error) {
    return (
      <Center flex={1} textAlign="center">
        {t("Unexpected error occured")}
      </Center>
    );
  }

  if (data && data.invitees.length > 0) {
    return (
      <Wrap
        spacing={2}
        paddingY={4}
        w="100%"
        justify={
          data.invitees.length >= centerPostQuantity || isXs
            ? "center"
            : "start"
        }
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
