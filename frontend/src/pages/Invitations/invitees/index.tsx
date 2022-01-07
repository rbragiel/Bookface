import { Center, Box, Wrap, WrapItem } from "@chakra-ui/react";
import { AppSpinner } from "@components/spinner";
import { useGetAllInviteesQuery } from "@store/friends";
import React from "react";
import { useTranslation } from "react-i18next";

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
      <Wrap spacing={2}>
        <WrapItem w="100%" maxW="300px">
          {JSON.stringify(data)}
        </WrapItem>
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
