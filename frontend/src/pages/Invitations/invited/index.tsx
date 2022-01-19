import React from "react";
import {
  Center,
  Wrap,
  Button,
  Flex,
  Text,
  useMediaQuery,
} from "@chakra-ui/react";
import { useGetAllInvitedQuery } from "@store/api";
import { useAppDispatch } from "@store/hooks";
import { open } from "@store/searchbar";
import { useTranslation } from "react-i18next";
import { InvitedCard } from "./invitedCard";
import { FullSpaceLoader } from "@components/fullSpaceLoader";
import { Breakpoints } from "@contants/breakpoints";

const centerPostQuantity = 2;

const Invited = () => {
  const { data, isLoading, error } = useGetAllInvitedQuery();
  const dispatch = useAppDispatch();
  const { t } = useTranslation();

  const [isXs] = useMediaQuery(Breakpoints.xs);

  if (isLoading) {
    return <FullSpaceLoader />;
  }

  if (error) {
    return (
      <Center flex={1}>
        <Center flex={1} textAlign="center">
          {t("Unexpected error occured")}
        </Center>
      </Center>
    );
  }

  if (data && data.invited.length > 0) {
    return (
      <Wrap
        spacing={2}
        paddingY={4}
        justify={
          data.invited.length >= centerPostQuantity || isXs ? "center" : "start"
        }
        alignItems="center"
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
