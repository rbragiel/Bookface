import React from "react";
import {
  Flex,
  Heading,
  Spacer,
  HStack,
  IconButton,
  Text,
  Image,
} from "@chakra-ui/react";
import { useReactions } from "@hooks/useReactions";
import { Choice, Post } from "@store/api/types";
import dayjs from "dayjs";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
} from "react-icons/ai";
import { Link } from "react-router-dom";
import { Box } from "@chakra-ui/react";

interface PostProps {
  post: Post;
  bg: string;
}

const PostView = ({ post, bg }: PostProps) => {
  const {
    reaction: { choice, dislikes, likes },
    isLoading,
    dislike,
    like,
    undo,
  } = useReactions(post, false);

  const postId = post.postData.postId;

  return (
    <Box bg={bg} p={4} borderRadius={10}>
      <Flex alignItems="center" justifyContent="space-between">
        <Heading as="h4" fontSize="xl">
          {post.postData.title}
        </Heading>
        <Flex alignItems="center" justifyContent="center">
          <Text>
            {dayjs(post.postData.timestamp).format("HH:mm DD-MM-YYYY")}
          </Text>
        </Flex>
      </Flex>
      <Text mt={3}>{post.postData.content}</Text>
      <Flex mt={4}>
        {post.postData.imageUrl && (
          <Image
            src={post.postData.imageUrl}
            alt="post-image"
            maxW="500px"
            maxH="300px"
          />
        )}
        <Spacer />
        <HStack alignItems="flex-end" justifyContent="flex-end">
          <IconButton
            colorScheme="teal"
            aria-label="like"
            icon={
              <>
                <Text mr={1}>{likes}</Text>
                <AiOutlineLike />
              </>
            }
            isLoading={isLoading}
            onClick={choice === Choice.LIKE ? undo : like}
            isDisabled={choice === Choice.DISLIKE}
          />
          <IconButton
            colorScheme="red"
            aria-label="dislike"
            icon={
              <>
                <Text mr={1}>{dislikes}</Text>
                <AiOutlineDislike />
              </>
            }
            isLoading={isLoading}
            onClick={choice === Choice.DISLIKE ? undo : dislike}
            isDisabled={choice === Choice.LIKE}
          />
          <Link to={`/dashboard/posts/${postId}`}>
            <IconButton
              colorScheme="blue"
              aria-label="comments"
              icon={
                <>
                  <Text mr={1}>{post.comments}</Text>
                  <AiOutlineComment />
                </>
              }
              isLoading={isLoading}
            />
          </Link>
        </HStack>
      </Flex>
    </Box>
  );
};

export { PostView };
