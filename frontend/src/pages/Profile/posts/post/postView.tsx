import React, { useState } from "react";
import dayjs from "dayjs";
import {
  Flex,
  Heading,
  Button,
  HStack,
  IconButton,
  Text,
  Image,
  Spacer,
} from "@chakra-ui/react";
import {
  AiOutlineLike,
  AiOutlineDislike,
  AiOutlineComment,
} from "react-icons/ai";
import { Choice, Post } from "@store/api/types";
import {
  useDeletePostMutation,
  useDislikeMutation,
  useLikeMutation,
  useUndoRectionMutation,
} from "@store/api";
import { useTranslation } from "react-i18next";
import { Link } from "react-router-dom";

interface PostViewProps {
  post: Post;
  startEdit: () => void;
  userId: string;
}

const PostView = ({ post, startEdit, userId }: PostViewProps) => {
  const [deletePost, { isLoading: isDeleteLoading }] = useDeletePostMutation();
  const { t } = useTranslation();
  const [{ choice, likes, dislikes }, setReaction] = useState({
    choice: post.choice,
    likes: post.reactions[0].quantity,
    dislikes: post.reactions[1].quantity,
  });

  const [_like, { isLoading: isLikeLoading }] = useLikeMutation();
  const [_dislike, { isLoading: isUnlikeLoading }] = useDislikeMutation();
  const [_undo, { isLoading: isUndoLoading }] = useUndoRectionMutation();

  const isLoading =
    isDeleteLoading || isUnlikeLoading || isUndoLoading || isLikeLoading;

  const postId = post.postData.postId;

  const like = async () => {
    await _like({ postId });
    setReaction((prev) => ({
      ...prev,
      choice: Choice.LIKE,
      likes: prev.likes + 1,
    }));
  };

  const dislike = async () => {
    await _dislike({ postId });
    setReaction((prev) => ({
      ...prev,
      choice: Choice.DISLIKE,
      dislikes: prev.dislikes + 1,
    }));
  };

  const undo = async () => {
    await _undo({ postId });
    setReaction((prev) => {
      const latestReaction = {
        choice: null,
        dislikes: prev.dislikes,
        likes: prev.likes,
      };

      if (prev.choice === Choice.DISLIKE) {
        latestReaction.dislikes = prev.dislikes - 1;
      } else {
        latestReaction.likes = prev.likes - 1;
      }

      return latestReaction;
    });
  };

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
            isLoading={isLoading}
          >
            {t("Edit")}
          </Button>
          <Button
            colorScheme="red"
            size="sm"
            ml={1}
            isLoading={isLoading}
            onClick={() => {
              deletePost({ userId, postId: post.postData.postId });
            }}
          >
            {t("Delete")}
          </Button>
        </Flex>
      </Flex>
      <Text mt={3}>{post.postData.content}</Text>
      <Flex mt={4}>
        {post.postData.imageUrl && (
          <Image
            src={post.postData.imageUrl}
            alt="post-image"
            maxW="500px"
            maxH="350px"
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
    </>
  );
};

export { PostView };
