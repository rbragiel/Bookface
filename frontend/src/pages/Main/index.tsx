import React, { useState } from "react";
import { ContentWrapper } from "@components/contentWrapper";
import { useGetPaginatedFriendsPostsQuery } from "@store/api";
import { FullSpaceLoader } from "@components/fullSpaceLoader";
import { Center } from "@chakra-ui/react";

const Main = () => {
  const [page, setPage] = useState(0);
  const { data, isLoading, isError } = useGetPaginatedFriendsPostsQuery({
    page,
  });

  if (isLoading) {
    return <FullSpaceLoader />;
  }

  if (isError) {
    return <Center flex={1}>Error</Center>;
  }

  return <ContentWrapper>{JSON.stringify(data)}</ContentWrapper>;
};

export { Main };
