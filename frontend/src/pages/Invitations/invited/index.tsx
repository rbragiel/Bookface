import React from "react";
import { Center, Wrap, Button, Flex, Text } from "@chakra-ui/react";
import { AppSpinner } from "@components/spinner";
import { useGetAllInvitedQuery } from "@store/api";
import { useAppDispatch } from "@store/hooks";
import { open } from "@store/searchbar";
import { useTranslation } from "react-i18next";
import { InvitedCard } from "./invitedCard";

const centerPostQuantity = 2;

const Invited = () => {
  const { data, isLoading, error } = useGetAllInvitedQuery();
  const dispatch = useAppDispatch();
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

  if (data && data.invited.length > 0) {
    return (
      <Wrap
        spacing={2}
        paddingY={4}
        justify={data.invited.length > centerPostQuantity ? "center" : "start"}
      >
        {data.invited.map((invitation) => (
          <InvitedCard key={invitation.invitationId} invitation={invitation} />
        ))}
      </Wrap>
    );
  } else {
    return (
      <Center flex={1}>
        <Flex justifyContent="center" flexDir="column">
          <Text>{t("You haven't sent any invites lately.")}</Text>
          <Button
            variant="outline"
            colorScheme="teal"
            ml={2}
            mt={2}
            onClick={() => dispatch(open())}
          >
            {t("Search for new people")}
          </Button>
        </Flex>
      </Center>
    );
  }
};

export { Invited };
