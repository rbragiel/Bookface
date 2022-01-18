import React, { useState } from "react";
import { useGetUserPaginatedPostsQuery } from "@store/api";
import { useParams } from "react-router-dom";
import { FullSpaceLoader } from "@components/fullSpaceLoader";
import {
  Center,
  Heading,
  Stack,
  useColorModeValue,
  Text,
  Button,
  Flex,
} from "@chakra-ui/react";
import { PostView } from "@components/postView";
import { useTranslation } from "react-i18next";

const postsQuantity = 20;

const Posts = () => {
  const { userId } = useParams();
  const bg = useColorModeValue("gray.100", "gray.900");
  const [page, setPage] = useState(0);
  const { data, isLoading, error } = useGetUserPaginatedPostsQuery(
    {
      page,
      userId: userId as string,
    },
    { refetchOnMountOrArgChange: true }
  );

  const { t } = useTranslation();

  if (isLoading) {
    return <FullSpaceLoader />;
  }

  if (error) {
    return <Center flex={1}>{JSON.stringify(data)}</Center>;
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
      <Heading size="lg">{t("User posts")}:</Heading>
      {data && data.allPosts.length > 0 ? (
        <>
          {data.allPosts.map((post) => (
            <PostView post={post} key={post.postData.postId} bg={bg} />
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
          <Text>{t("User does not have any posts yet.")}</Text>
        </Center>
      )}
    </Stack>
  );
};

export { Posts };
