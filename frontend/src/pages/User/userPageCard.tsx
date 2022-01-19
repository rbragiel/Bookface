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
  useMediaQuery,
} from "@chakra-ui/react";
import dayjs from "dayjs";
import { DeleteIcon, SearchIcon, StarIcon, TimeIcon } from "@chakra-ui/icons";
import { useDeleteFriendMutation, useInviteMutation } from "@store/api";
import { useTranslation } from "react-i18next";
import { Breakpoints } from "@contants/breakpoints";

interface UserCardProps {
  user: GetUserUser;
}

const UserCard = ({ user }: UserCardProps) => {
  const [deleteFriend, { isLoading: isDeleteFriendLoading }] =
    useDeleteFriendMutation();
  const [invite, { isLoading: isInviteFriendLoading }] = useInviteMutation();
  const { t } = useTranslation();
  const [isXs] = useMediaQuery(Breakpoints.xs);

  const renderButtons = () => {
    if (user.isInviter) {
      return (
        <Text maxW="150px" textAlign="center">
          {t("User has invited you to friends")}
        </Text>
      );
    }
    if (user.isInvitee) {
      return (
        <Text maxW="150px" textAlign="center">
          {t("You have invited this user to friends")}
        </Text>
      );
    }
    return (
      <Button
        onClick={() => invite({ id: user.userId })}
        isLoading={isInviteFriendLoading}
        textAlign="center"
      >
        {t("Add to friends")}
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
      w="100%"
      alignSelf="center"
    >
      <Stack w="100%" direction="row" alignItems="center" spacing={6}>
        <Avatar
          size="2xl"
          src={user.avatarURL || undefined}
          alt="Avatar"
          mb={4}
        />
        <Flex
          justifyContent="space-between"
          alignItems="center"
          flex={1}
          flexDirection={isXs ? "column" : "row"}
        >
          <Box>
            <Heading
              fontSize="2xl"
              fontFamily="body"
              textAlign={isXs ? "center" : "left"}
            >
              {user.nickname}
            </Heading>
            <Text
              fontWeight={600}
              color="gray.500"
              textAlign={isXs ? "center" : "left"}
            >
              {user.email}
            </Text>
          </Box>
          <Flex
            flexDirection="column"
            justifyContent="center"
            alignItems="center"
            marginRight={isXs ? 0 : 4}
          >
            {user.areFriends ? (
              <>
                <Text textAlign="center">
                  {t("You have been friends since")} <br />
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
                  {t("Delete")}
                </Button>
              </>
            ) : (
              renderButtons()
            )}
          </Flex>
        </Flex>
      </Stack>
      <List spacing={3} fontSize={16} mt={isXs ? 6 : 0}>
        {user.description && (
          <ListItem display="flex" alignItems="center">
            <ListIcon as={SearchIcon} color="green.500" />
            <b style={{ marginRight: "6px" }}>{t("About")}:</b>{" "}
            {user.description}
          </ListItem>
        )}
        {user.birthday && (
          <ListItem display="flex" alignItems="center">
            <ListIcon as={StarIcon} color="green.500" />
            <b style={{ marginRight: "6px" }}>{t("Birthday")}:</b>{" "}
            {user.birthday}
          </ListItem>
        )}
        <ListItem display="flex" alignItems="center">
          <ListIcon as={TimeIcon} color="green.500" />
          <b style={{ marginRight: "6px" }}>{t("On Bookface since")}:</b>{" "}
          {dayjs(user.joined).format("DD-MM-YYYY")}
        </ListItem>
      </List>
    </Flex>
  );
};

export { UserCard };
