import { SearchIcon, StarIcon, TimeIcon } from "@chakra-ui/icons";
import {
  Flex,
  useColorModeValue,
  Stack,
  Avatar,
  Box,
  Heading,
  Text,
  List,
  ListIcon,
  ListItem,
  useBoolean,
  IconButton,
} from "@chakra-ui/react";
import { User } from "@models/user";
import dayjs from "dayjs";
import React from "react";
import { useTranslation } from "react-i18next";
import { AiFillEdit, AiOutlineCloseCircle } from "react-icons/ai";
import { Edit } from "./edit";

interface CardProps {
  user: User;
}

const Card = ({ user }: CardProps) => {
  const [isEditing, { off, on }] = useBoolean();
  const { t } = useTranslation();

  return (
    <Flex
      backgroundColor={useColorModeValue("gray.100", "gray.900")}
      padding={4}
      flexDirection="column"
      borderRadius={10}
      maxWidth="1200px"
      alignSelf="center"
      w="100%"
    >
      <Stack w="100%" direction="row" spacing={6}>
        <Avatar size="2xl" src={user.avatarURL} alt="Avatar" mb={4} />
        <Flex justifyContent="space-between" alignItems="center" flex={1}>
          <Box>
            <Heading fontSize="2xl" fontFamily="body">
              {user.nickname}
            </Heading>
            <Text fontWeight={600} color="gray.500">
              {user.email}
            </Text>
          </Box>
          {isEditing ? (
            <IconButton
              colorScheme="red"
              aria-label="cancel"
              icon={<AiOutlineCloseCircle />}
              onClick={() => {
                off();
              }}
              alignSelf="flex-start"
            />
          ) : (
            <IconButton
              colorScheme="teal"
              aria-label="edit"
              icon={<AiFillEdit />}
              alignSelf="flex-start"
              onClick={on}
            />
          )}
        </Flex>
      </Stack>
      {isEditing ? (
        <Edit
          data={{ birthday: user.birthday, description: user.description }}
          off={off}
        />
      ) : (
        <List spacing={3} fontSize={16}>
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
              <b style={{ marginRight: "6px" }}>{t("Birthday")}: </b>{" "}
              {dayjs(user.birthday).format("DD-MM-YYYY")}
            </ListItem>
          )}
          <ListItem display="flex" alignItems="center">
            <ListIcon as={TimeIcon} color="green.500" />
            <b style={{ marginRight: "6px" }}>{t("On Bookface since")}: </b>
            {dayjs(user.joined).format("DD-MM-YYYY")}
          </ListItem>
        </List>
      )}
    </Flex>
  );
};

export { Card };
