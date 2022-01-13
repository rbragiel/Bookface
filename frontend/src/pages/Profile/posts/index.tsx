import { Center, Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import { FullSpaceLoader } from "@components/fullSpaceLoader";
import { useGetPaginatedUserProfilePostsQuery } from "@store/api";
import React, { useState } from "react";
import { Post } from "./post";

interface PostsProps {
  userId: string;
}

const Posts = ({ userId }: PostsProps) => {
  const [page, setPage] = useState(0);
  const bg = useColorModeValue("gray.100", "gray.900");
  const { data, isLoading, isError } = useGetPaginatedUserProfilePostsQuery({
    userId,
    page,
  });

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
    >
      <Heading size="lg">Your posts:</Heading>
      {data?.allPosts.map((post) => (
        <Post post={post} key={post.postData.postId} bg={bg} />
      ))}
    </Stack>
  );
};

export default Posts;
