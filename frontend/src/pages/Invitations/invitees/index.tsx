import { Center } from "@chakra-ui/react";
import { AppSpinner } from "@components/spinner";
import { useGetAllInviteesQuery } from "@store/invitations";
import React from "react";

const Invitees = () => {
  const { data, isLoading } = useGetAllInviteesQuery();

  if (isLoading) {
    return (
      <Center>
        <AppSpinner />
      </Center>
    );
  }

  return <div>{JSON.stringify(data)}</div>;
};

export { Invitees };
