import { Center } from "@chakra-ui/react";
import { ContentWrapper } from "@components/contentWrapper";
import { useGetUserQuery } from "@store/api";
import React from "react";
import { useParams } from "react-router-dom";
import { AppSpinner } from "@components/spinner";
import { UserCard } from "./userPageCard";

const User = () => {
  const { userId } = useParams();

  const { data, isLoading, error } = useGetUserQuery(userId ?? "");

  if (isLoading) {
    return (
      <Center flex={1}>
        <AppSpinner />
      </Center>
    );
  }

  if (error) {
    return <Center flex={1}>{JSON.stringify(error)}</Center>;
  }

  return (
    <ContentWrapper mt={4} borderRadius={20}>
      {data && <UserCard user={data.user} />}
    </ContentWrapper>
  );
};

export { User };
