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
} from "@chakra-ui/react";
import { PostView } from "@components/postView";
import { useTranslation } from "react-i18next";

const Posts = () => {
  const { userId } = useParams();
  const bg = useColorModeValue("gray.100", "gray.900");
  const [page, setPage] = useState(0);
  const { data, isLoading, error, refetch } = useGetUserPaginatedPostsQuery(
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
