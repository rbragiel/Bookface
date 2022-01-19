import React, { useState } from "react";
import { ContentWrapper } from "@components/contentWrapper";
import { useGetPaginatedFriendsPostsQuery } from "@store/api";
import { FullSpaceLoader } from "@components/fullSpaceLoader";
import {
  Button,
  Center,
  Flex,
  Heading,
  Stack,
  Text,
  useColorModeValue,
} from "@chakra-ui/react";
import { PostView } from "@components/postView";
import { useTranslation } from "react-i18next";

const postsQuantity = 20;

const Main = () => {
  const [page, setPage] = useState(0);
  const bg = useColorModeValue("gray.100", "gray.900");
  const { data, isLoading, isError } = useGetPaginatedFriendsPostsQuery(
    {
      page,
    },
    { refetchOnMountOrArgChange: true }
  );

  const { t } = useTranslation();

  if (isLoading) {
    return <FullSpaceLoader />;
  }

  if (isError) {
    return <Center flex={1}>Error</Center>;
  }

  return (
    <ContentWrapper w="100%" mb={4}>
      <Stack
        spacing={4}
        maxWidth="1000px"
        width="100%"
        marginY={16}
        alignSelf="center"
        height="100%"
      >
        <Heading size="lg">{t("Your friends posts")}:</Heading>
        {data && data.allPosts.length > 0 ? (
          <>
            {data.allPosts.map((post) => (
              <PostView
                post={post}
                key={post.postData.postId}
                bg={bg}
                shouldShowAvatar
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
            <Text>{t("Friends have not uploaded any posts yet.")}</Text>
          </Center>
        )}
      </Stack>
    </ContentWrapper>
  );
};

export { Main };
