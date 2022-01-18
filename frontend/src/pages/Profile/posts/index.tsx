import React, { useState } from "react";
import {
  Center,
  Heading,
  Stack,
  useColorModeValue,
  Button,
  Text,
  Flex,
} from "@chakra-ui/react";
import { FullSpaceLoader } from "@components/fullSpaceLoader";
import { useGetPaginatedUserProfilePostsQuery } from "@store/api";
import { useAppDispatch } from "@store/hooks";
import { Post } from "./post";
import { open } from "@store/post";
import { useTranslation } from "react-i18next";

interface PostsProps {
  userId: string;
}

const postsQuantity = 20;

const Posts = ({ userId }: PostsProps) => {
  const [page, setPage] = useState(0);
  const bg = useColorModeValue("gray.100", "gray.900");
  const { data, isLoading, isError } = useGetPaginatedUserProfilePostsQuery(
    {
      userId,
      page,
    },
    { refetchOnMountOrArgChange: true }
  );

  const { t } = useTranslation();

  const dispatch = useAppDispatch();

  if (isLoading) {
    return <FullSpaceLoader />;
  }

  if (isError) {
    return <Center flex={1}>Error</Center>;
  }

  return (
    <Stack
      spacing={4}
      maxWidth="1000px"
      width="100%"
      marginY={16}
      alignSelf="center"
      height="100%"
    >
      <Heading size="lg">{t("Your posts")}:</Heading>
      {data && data.allPosts.length > 0 ? (
        <>
          {data.allPosts.map((post) => (
            <Post
              post={post}
              key={post.postData.postId}
              bg={bg}
              userId={userId}
            />
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
              isDisabled={data.allPosts.length < postsQuantity}
            >
              {t("Next page")}
            </Button>
          </Flex>
        </>
      ) : (
        <Center flex={1} justifyContent="center" flexDir="column">
          <Text>{t("You don't have any posts right now.")}</Text>
          <Button
            variant="outline"
            colorScheme="teal"
            ml={2}
            mt={2}
            onClick={() => dispatch(open())}
          >
            {t("Add new post!")}
          </Button>
        </Center>
      )}
    </Stack>
  );
};

export default Posts;
