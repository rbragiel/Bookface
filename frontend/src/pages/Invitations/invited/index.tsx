import React from "react";
import { Center, Wrap, WrapItem, Button, Flex, Text } from "@chakra-ui/react";
import { AppSpinner } from "@components/spinner";
import { useGetAllInvitedQuery } from "@store/friends";
import { useAppDispatch } from "@store/hooks";
import { open } from "@store/searchbar";
import { useTranslation } from "react-i18next";

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
      <Wrap spacing={2}>
        <WrapItem w="100%" maxW="300px">
          {JSON.stringify(data)}
        </WrapItem>
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
