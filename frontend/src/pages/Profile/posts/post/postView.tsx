import React from "react";
import dayjs from "dayjs";
import {
  Flex,
  Heading,
  Button,
  HStack,
  IconButton,
  Text,
} from "@chakra-ui/react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
} from "react-icons/ai";
import { Post } from "@store/api/types";
import { useDeletePostMutation } from "@store/api";

interface PostViewProps {
  post: Post;
  startEdit: () => void;
  userId: string;
}

const PostView = ({ post, startEdit, userId }: PostViewProps) => {
  const [deletePost, { isLoading }] = useDeletePostMutation();

  return (
    <>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h4" fontSize="xl">
          {post.postData.title}
        </Heading>
        <Flex alignItems="center" justifyContent="center">
          <Text>
            {dayjs(post.postData.timestamp).format("HH:mm DD-MM-YYYY")}
          </Text>
          <Button
            colorScheme="teal"
            size="sm"
            ml={3}
            onClick={startEdit}
            isDisabled={isLoading}
          >
            Edit
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            ml={1}
            isDisabled={isLoading}
            onClick={() => {
              deletePost({ userId, postId: post.postData.postId });
            }}
          >
            Delete
          </Button>
        </Flex>
      </Flex>
      <Text mt={3}>{post.postData.content}</Text>
      <HStack alignItems="center" justifyContent="flex-end">
        <IconButton
          colorScheme="teal"
          aria-label="like"
          icon={<AiOutlineLike />}
          isDisabled={isLoading}
        />
        <IconButton
          colorScheme="red"
          aria-label="dislike"
          icon={<AiOutlineDislike />}
          isDisabled={isLoading}
        />
        <IconButton
          colorScheme="blue"
          aria-label="comments"
          icon={<AiOutlineComment />}
          isDisabled={isLoading}
        />
      </HStack>
    </>
  );
};

export { PostView };
