import React from "react";
import { Flex, Heading, Text, HStack, IconButton } from "@chakra-ui/react";
import { Post as PostType } from "@store/api/types";
import dayjs from "dayjs";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
} from "react-icons/ai";

interface PostProps {
  post: PostType;
  bg: string;
}

const Post = ({ post, bg }: PostProps) => {
  return (
    <Flex w="100%" p={4} borderRadius={10} flexDir="column" bg={bg}>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h4" fontSize="xl">
          {post.postData.title}
        </Heading>
        <Text>{dayjs(post.postData.timestamp).format("HH:mm DD-MM-YYYY")}</Text>
      </Flex>
      <Text mt={3}>{post.postData.title}</Text>
      <HStack alignItems="center" justifyContent="flex-end">
        <IconButton
          colorScheme="teal"
          aria-label="like"
          icon={<AiOutlineLike />}
        />
        <IconButton
          colorScheme="red"
          aria-label="dislike"
          icon={<AiOutlineDislike />}
        />
        <IconButton
          colorScheme="blue"
          aria-label="comments"
          icon={<AiOutlineComment />}
        />
      </HStack>
    </Flex>
  );
};

export { Post };
