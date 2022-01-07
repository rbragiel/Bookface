import React from "react";
import { Box, Center, Stack } from "@chakra-ui/react";
import { useGetFriendsQuery } from "@store/friends";
import { AppSpinner } from "@components/spinner";
import { FriendListEl } from "./friend";
import { useTranslation } from "react-i18next";

const FriendsList = () => {
  const { data, isLoading } = useGetFriendsQuery();
  const { t } = useTranslation();
  if (isLoading) {
    return (
      <Center flex={1}>
        <AppSpinner size="lg" />
      </Center>
    );
  }

  return (
    <Stack spacing={2} mt={4}>
      {data &&
        (data.friends.length > 0 ? (
          data.friends.map((friend) => (
            <FriendListEl friend={friend} key={friend.userId} />
          ))
        ) : (
          <Box textAlign="center">
            {t("No friends yet. Look for them using searchbar.")}
          </Box>
        ))}
    </Stack>
  );
};

export { FriendsList };
