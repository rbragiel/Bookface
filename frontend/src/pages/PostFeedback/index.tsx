import {
  Box,
  Button,
  Center,
  Flex,
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
import { useTranslation } from "react-i18next";
import { useParams } from "react-router-dom";
import { Comment } from "./comment";
import { CommentsInput } from "./commentsInput";

const commentsQuantity = 20;

const PostFeedback = () => {
  const { id } = useParams();

  useConditionalRedirect(typeof id === "undefined");

  const { t } = useTranslation();

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

  if (isPostLoading) {
    return <FullSpaceLoader />;
  }

  return (
    <ContentWrapper
      w="100%"
      flexDirection="column"
      alignItems="center"
      width="100%"
    >
      {isPostError && (
        <Box w="100%" maxW="1200px">
          {t("Unexpected error occured while loading posts.")}
        </Box>
      )}

      {isCommentsError && (
        <Box w="100%" maxW="1200px">
          {t("Unexpected error occured while loading comments.")}
        </Box>
      )}

      {areCommentsLoading && <FullSpaceLoader />}

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

      {commentsData && (
        <Box w="100%" maxW="1200px">
          <CommentsInput postId={id as string} />
          <Heading size="md" my={4}>
            {t("All comments")}:
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
              <Flex justifyContent="center" px={6}>
                <Button
                  onClick={() => setPage((page) => page - 1)}
                  isDisabled={page === 0}
                >
                  {t("Previous page")}
                </Button>
                <Button
                  ml={6}
                  onClick={() => setPage((page) => page + 1)}
                  isDisabled={
                    postData &&
                    postData.comments - (page + 1) * commentsQuantity <= 0
                  }
                >
                  {t("Next page")}
                </Button>
              </Flex>
            </Stack>
          ) : (
            <Center flex={1} mt={6}>
              {t("No comments added to this post.")}
            </Center>
          )}
        </Box>
      )}
    </ContentWrapper>
  );
};

export { PostFeedback };
