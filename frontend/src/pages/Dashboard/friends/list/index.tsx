import React from "react";
import { Box, Stack } from "@chakra-ui/react";
import { useGetFriendsQuery } from "@store/api";
import { FriendListEl } from "./friend";
import { useTranslation } from "react-i18next";
import { FullSpaceLoader } from "@components/fullSpaceLoader";

const FriendsList = () => {
  const { data, isLoading } = useGetFriendsQuery();
  const { t } = useTranslation();
  if (isLoading) {
    return <FullSpaceLoader size="lg" />;
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
