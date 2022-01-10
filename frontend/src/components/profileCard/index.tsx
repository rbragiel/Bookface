import {
  Avatar,
  Box,
  Heading,
  Stack,
  useColorModeValue,
  Text,
} from "@chakra-ui/react";
import { Friend, InviteUser } from "@store/api/types";
import React from "react";
import { Link } from "react-router-dom";
import dayjs from "dayjs";
import { useTranslation } from "react-i18next";

interface ProfileCardProps {
  user: InviteUser | Friend;
  children: React.ReactNode;
}

const ProfileCard = React.memo(({ user, children }: ProfileCardProps) => {
  const { t } = useTranslation();
  return (
    <Box
      maxW="350px"
      w="full"
      bg={useColorModeValue("gray.100", "gray.900")}
      rounded="lg"
      p={6}
      textAlign="center"
    >
      <Avatar
        size="xl"
        src="https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
        alt="Avatar"
        mb={4}
        pos="relative"
      />

      <Heading fontSize="2xl" fontFamily="body">
        <Link to={`/dashboard/users/${user.userId}`}>{user.nickname}</Link>
      </Heading>

      <Text fontWeight={600} color="gray.500" mb={2}>
        {user.email}
      </Text>

      {(user as Friend).friendsSince && (
        <Text fontWeight={600} color="gray.500" mb={2}>
          {t("Friends since")}:{" "}
          {dayjs((user as Friend).friendsSince).format("DD-MM-YYYY")}
        </Text>
      )}

      <Stack mt={8} direction="row" spacing={4} justify="center">
        {children}
      </Stack>
    </Box>
  );
});

ProfileCard.displayName = "ProfileCard";

export { ProfileCard };
