import { GetUserUser } from "@store/api/types";
import React from "react";
import {
  Avatar,
  Flex,
  useColorModeValue,
  Text,
  Heading,
  Stack,
  Box,
  Button,
  List,
  ListItem,
  ListIcon,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { DeleteIcon, SearchIcon, StarIcon, TimeIcon } from "@chakra-ui/icons";
import { useDeleteFriendMutation, useInviteMutation } from "@store/api";

interface UserCardProps {
  user: GetUserUser;
}

const UserCard = ({ user }: UserCardProps) => {
  const [deleteFriend, { isLoading: isDeleteFriendLoading }] =
    useDeleteFriendMutation();
  const [invite, { isLoading: isInviteFriendLoading }] = useInviteMutation();

  const renderButtons = () => {
    if (user.isInviter) {
      return (
        <Text maxW="150px" textAlign="center">
          User has invited you to friends
        </Text>
      );
    }
    if (user.isInvitee) {
      return (
        <Text maxW="150px" textAlign="center">
          You have invited this user to friends
        </Text>
      );
    }
    return (
      <Button
        onClick={() => invite({ id: user.userId })}
        isLoading={isInviteFriendLoading}
      >
        Add to friends
      </Button>
    );
  };

  return (
    <Flex
      backgroundColor={useColorModeValue("gray.100", "gray.900")}
      padding={4}
      flexDirection="column"
      borderRadius={10}
      maxWidth="1200px"
    >
      <Stack w="100%" direction="row" alignItems="center" spacing={6}>
        <Avatar
          size="2xl"
          src="https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          alt="Avatar"
          mb={4}
        />
        <Flex justifyContent="space-between" alignItems="center" flex={1}>
          <Box>
            <Heading fontSize="2xl" fontFamily="body">
              {user.nickname}
            </Heading>
            <Text fontWeight={600} color="gray.500">
              {user.email}
            </Text>
          </Box>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginRight={4}
          >
            {user.areFriends ? (
              <>
                <Text textAlign="center">
                  You have been friends since <br />
                  <strong>
                    {dayjs(user.friendsSince).format("DD-MM-YYYY")}
                  </strong>
                </Text>
                <Button
                  w="fit-content"
                  mt={3}
                  colorScheme="red"
                  variant="outline"
                  leftIcon={<DeleteIcon />}
                  onClick={() => deleteFriend({ id: user.userId })}
                  isLoading={isDeleteFriendLoading}
                >
                  Delete
                </Button>
              </>
            ) : (
              renderButtons()
            )}
          </Flex>
        </Flex>
      </Stack>
      <List spacing={3} fontSize={16}>
        {user.description && (
          <ListItem display="flex" alignItems="center">
            <ListIcon as={SearchIcon} color="green.500" />
            About: {user.description}
          </ListItem>
        )}
        {user.birthday && (
          <ListItem display="flex" alignItems="center">
            <ListIcon as={StarIcon} color="green.500" />
            Birthday: {user.birthday}
          </ListItem>
        )}
        <ListItem display="flex" alignItems="center">
          <ListIcon as={TimeIcon} color="green.500" />
          On Bookface since: {dayjs(user.joined).format("DD-MM-YYYY")}
        </ListItem>
      </List>
    </Flex>
  );
};

export { UserCard };
