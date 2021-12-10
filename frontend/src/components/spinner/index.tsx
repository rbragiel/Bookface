import React from "react";
import { Spinner, SpinnerProps, useColorModeValue } from "@chakra-ui/react";

const AppSpinner = (props: SpinnerProps) => {
  const color = useColorModeValue("gray.600", "yellow.200");

  return (
    <Spinner {...props} size="xl" speed="0.65s" thickness="4px" color={color} />
  );
};

export { AppSpinner };
