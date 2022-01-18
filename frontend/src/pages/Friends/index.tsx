import React from "react";
import { Grid, Box, Button, Center, Text } from "@chakra-ui/react";
import { ProfileCard } from "@components/profileCard";
import { useGetFriendsQuery, useDeleteFriendMutation } from "@store/api";
import { Link as RouterLink } from "react-router-dom";
import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";
import { FullSpaceLoader } from "@components/fullSpaceLoader";
import { useAppDispatch } from "@store/hooks";
import { open } from "@store/searchbar";
import { useTranslation } from "react-i18next";
import { ContentWrapper } from "@components/contentWrapper";

const Friends = () => {
  const { isLoading, data, error } = useGetFriendsQuery();
  const [deleteFriend, { isLoading: isDeleteFriendLoading }] =
    useDeleteFriendMutation();

  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  if (isLoading) {
    return <FullSpaceLoader />;
  }

  if (error) {
    return <Box>{JSON.stringify(error)}</Box>;
  }

  if (data) {
    return data.friends.length > 0 ? (
      <ContentWrapper maxWidth="1200px" alignSelf="center" w="100%">
        <Grid
          templateColumns="repeat(3, 1fr)"
          gap={2}
          alignSelf="center"
          w="100%"
          padding={4}
          overflowY="auto"
        >
          {data &&
            data.friends.length > 0 &&
            data.friends.map((friend) => (
              <ProfileCard user={friend} key={Math.random()}>
                <Button
                  as={RouterLink}
                  to={`/dashboard/chat/${friend.userId}`}
                  variant="outline"
                  colorScheme="teal"
                  isLoading={isDeleteFriendLoading}
                  leftIcon={<ChatIcon />}
                >
                  Chat
                </Button>
                <Button
                  colorScheme="red"
                  isLoading={isDeleteFriendLoading}
                  leftIcon={<DeleteIcon />}
                  onClick={() => deleteFriend({ id: friend.userId })}
                >
                  Delete
                </Button>
              </ProfileCard>
            ))}
        </Grid>
      </ContentWrapper>
    ) : (
      <ContentWrapper maxWidth="1200px">
        <Center flex={1} flexDir="column" justifyContent="center">
          <Text textAlign="center">{t("You don't have friends yet.")}</Text>
          <Button
            variant="outline"
            colorScheme="teal"
            onClick={() => dispatch(open())}
            mt={2}
          >
            {t("Search for friends")}
          </Button>
        </Center>
      </ContentWrapper>
    );
  }

  return null;
};

export { Friends };
