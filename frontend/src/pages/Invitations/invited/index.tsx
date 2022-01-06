import React from "react";
import { Center } from "@chakra-ui/react";
import { AppSpinner } from "@components/spinner";
import { useGetAllInvitedQuery } from "@store/invitations";

const Invited = () => {
  const { data, isLoading } = useGetAllInvitedQuery();

  if (isLoading) {
    return (
      <Center>
        <AppSpinner />
      </Center>
    );
  }

  return <div>{JSON.stringify(data)}</div>;
};

export { Invited };
