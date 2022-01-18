import {
  Box,
  Center,
  Heading,
  Stack,
  useColorModeValue,
} from "@chakra-ui/react";
import { ContentWrapper } from "@components/contentWrapper";
import { FullSpaceLoader } from "@components/fullSpaceLoader";
import { PostView } from "@components/postView";
import { useConditionalRedirect } from "@hooks/useConditionalRedirect";
import { useGetPostCommentsQuery, useGetSinglePostQuery } from "@store/api";
import { useAppSelector } from "@store/hooks";
import React, { useState } from "react";
import { useParams } from "react-router-dom";
import { Comment } from "./comment";
import { CommentsInput } from "./commentsInput";

const PostFeedback = () => {
  const { id } = useParams();

  useConditionalRedirect(typeof id === "undefined");

  const {
    data: postData,
    isLoading: isPostLoading,
    isError: isPostError,
  } = useGetSinglePostQuery({
    postId: id as string,
  });

  const [page, setPage] = useState(0);

  const {
    data: commentsData,
    isLoading: areCommentsLoading,
    isError: isCommentsError,
  } = useGetPostCommentsQuery({ page, postId: id as string });

  const user = useAppSelector((state) => state.auth.user);

  const bg = useColorModeValue("gray.100", "gray.900");

  if (isPostLoading || areCommentsLoading) {
    return <FullSpaceLoader />;
  }

  return (
    <ContentWrapper
      w="100%"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      {postData && (
        <Box w="100%" maxW="1200px" mt={2}>
          <PostView
            post={postData}
            bg={bg}
            shouldShowAvatar={user?.userId !== postData.user.userId}
            shouldShowCommentsIcon={false}
          />
        </Box>
      )}
      {isPostError && (
        <Box w="100%" maxW="1200px">
          Error occured while loading post
        </Box>
      )}

      {commentsData && (
        <Box w="100%" maxW="1200px">
          <CommentsInput postId={id as string} page={page} />
          <Heading size="md" my={4}>
            All comments:
          </Heading>
          {commentsData.length > 0 ? (
            <Stack
              width="100%"
              borderRadius={10}
              bg={bg}
              spacing={8}
              paddingY={4}
            >
              {commentsData.map((comment) => (
                <Comment key={comment.commentId} comment={comment} />
              ))}
            </Stack>
          ) : (
            <Center flex={1} mt={4}>
              No posts yet
            </Center>
          )}
        </Box>
      )}

      {isCommentsError && (
        <Box w="100%" maxW="1200px">
          Error occured while loading comments
        </Box>
      )}
    </ContentWrapper>
  );
};

export { PostFeedback };
