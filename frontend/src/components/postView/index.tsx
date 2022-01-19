import React from "react";
import {
  Flex,
  Heading,
  Spacer,
  HStack,
  IconButton,
  Text,
  Image,
  Avatar,
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
import { Box, useMediaQuery } from "@chakra-ui/react";
import { Breakpoints } from "@contants/breakpoints";

interface PostProps {
  post: Post;
  bg: string;
  shouldShowAvatar?: boolean;
  shouldShowCommentsIcon?: boolean;
}

const PostView = ({
  post,
  bg,
  shouldShowAvatar,
  shouldShowCommentsIcon = true,
}: PostProps) => {
  const [isSm] = useMediaQuery(Breakpoints.sm);

  const {
    reaction: { choice, dislikes, likes },
    isLoading,
    dislike,
    like,
    undo,
  } = useReactions(post, false);

  const postId = post.postData.postId;

  return (
    <Box bg={bg} p={4} borderRadius={10} width="full">
      {shouldShowAvatar && (
        <Flex align="center" mb={4}>
          <Avatar src={post.user.avatarURL} alt="avatar" />
          <Text fontSize="lg" ml={2} fontWeight="bold">
            {post.user.nickname}
          </Text>
        </Flex>
      )}
      <Flex
        alignItems={isSm ? "start" : "center"}
        justifyContent="space-between"
        flexDir={isSm ? "column" : "row"}
      >
        <Heading as="h4" fontSize="xl" maxW="500px" wordBreak="break-word">
          {post.postData.title}
        </Heading>
        <Flex alignItems="center" justifyContent="center">
          <Text>
            {dayjs(post.postData.timestamp).format("HH:mm DD-MM-YYYY")}
          </Text>
        </Flex>
      </Flex>
      <Text mt={3} maxW="600px" wordBreak="break-word">
        {post.postData.content}
      </Text>
      <Flex mt={4} flexDir={isSm ? "column" : "row"} alignSelf={"flex-start"}>
        {post.postData.imageUrl && (
          <Image
            src={post.postData.imageUrl}
            alt="post-image"
            maxW="500px"
            maxH="300px"
            objectFit="contain"
            objectPosition="left"
          />
        )}
        <Spacer />
        <HStack
          alignItems="flex-end"
          justifyContent={isSm ? "column" : "flex-end"}
          mt={isSm ? 4 : 0}
        >
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
          {shouldShowCommentsIcon && (
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
          )}
        </HStack>
      </Flex>
    </Box>
  );
};

export { PostView };
