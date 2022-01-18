import { Avatar, Box, Flex, Text } from "@chakra-ui/react";
import { PostComment } from "@store/api/types";
import dayjs from "dayjs";
import React from "react";

interface CommentProps {
  comment: PostComment;
}

const Comment = ({ comment }: CommentProps) => {
  return (
    <Box paddingX={4}>
      <Flex alignItems="center" justifyContent="space-between" mb={4}>
        <Flex justifyContent="center" alignItems="center">
          <Avatar src={comment.user.avatarURL} alt="avatar" />
          <Text fontSize="md" ml={4} fontWeight="semibold">
            {comment.user.nickname}
          </Text>
        </Flex>
        <Text>{dayjs(comment.timestamp).format("HH:mm DD-MM-YYYY")}</Text>
      </Flex>
      <Text mt={4} maxW="600px">
        {comment.content}
      </Text>
    </Box>
  );
};

export { Comment };
