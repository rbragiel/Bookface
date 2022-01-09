import React from "react";
import { Grid, Box, Button } from "@chakra-ui/react";
import { ProfileCard } from "@components/profileCard";
import { useGetFriendsQuery, useDeleteFriendMutation } from "@store/api";
import { Link as RouterLink } from "react-router-dom";
import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";
import { FullSpaceLoader } from "@components/fullSpaceLoader";

const Friends = () => {
  const { isLoading, data, error } = useGetFriendsQuery();
  const [deleteFriend, { isLoading: isDeleteFriendLoading }] =
    useDeleteFriendMutation();

  if (isLoading) {
    return <FullSpaceLoader />;
  }

  if (error) {
    return <Box>{JSON.stringify(error)}</Box>;
  }

  return (
    <Grid
      templateColumns="repeat(6, 1fr)"
      gap={2}
      alignSelf="center"
      w="100%"
      padding={4}
      overflowY="auto"
    >
      {data &&
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
  );
};

export { Friends };
