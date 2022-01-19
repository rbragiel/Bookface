import { Avatar, Box, Flex, Text, useMediaQuery } from "@chakra-ui/react";
import { PostComment } from "@store/api/types";
import dayjs from "dayjs";
import React from "react";
import { Breakpoints } from "@contants/breakpoints";

interface CommentProps {
  comment: PostComment;
}

const Comment = ({ comment }: CommentProps) => {
  const [isXs] = useMediaQuery(Breakpoints.xs);

  return (
    <Box paddingX={4}>
      <Flex
        alignItems={isXs ? "flex-start" : "center"}
        justifyContent="space-between"
        mb={4}
      >
        <Flex
          justifyContent="center"
          alignItems={isXs ? "flex-start" : "center"}
          flexDir={isXs ? "column" : "row"}
        >
          <Avatar src={comment.user.avatarURL} alt="avatar" />
          <Text
            fontSize="md"
            ml={isXs ? 0 : 4}
            mt={isXs ? 4 : 0}
            fontWeight="semibold"
          >
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
