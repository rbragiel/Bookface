import React from "react";
import { useActivate } from "@hooks/user/useActivate";
import { Flex } from "@chakra-ui/react";
import { AppSpinner } from "@components/spinner";
import { Result } from "./result";

const Activate = () => {
  const { isLoading, isSuccess, error } = useActivate();

  const render = () => {
    if (isLoading) {
      return <AppSpinner />;
    }

    return <Result isSuccess={isSuccess} error={error} />;
  };

  return (
    <Flex
      w="100%"
      maxWidth="1200px"
      justifyContent={isLoading ? "center" : "space-between"}
      alignItems="center"
      margin="auto"
    >
      {render()}
    </Flex>
  );
};

export { Activate };
