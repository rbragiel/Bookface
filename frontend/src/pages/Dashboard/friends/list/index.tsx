import React from "react";
import { Box, Center } from "@chakra-ui/react";
import { useGetFriendsQuery } from "@store/friends";
import { AppSpinner } from "@components/spinner";

const FriendsList = () => {
  const { data, isLoading } = useGetFriendsQuery();

  if (isLoading) {
    return (
      <Center flex={1}>
        <AppSpinner size="lg" />
      </Center>
    );
  }

  return <Box>{JSON.stringify(data)}</Box>;
};

export { FriendsList };
