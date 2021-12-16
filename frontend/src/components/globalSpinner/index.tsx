import React from "react";
import { Center } from "@chakra-ui/react";
import { AppSpinner } from "../spinner";

const GlobalSpinner = () => {
  return (
    <Center w="100%" h="100%">
      <AppSpinner />
    </Center>
  );
};

export default GlobalSpinner;
