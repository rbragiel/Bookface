import React from "react";
import { Center, SpinnerProps } from "@chakra-ui/react";
import { AppSpinner } from "@components/spinner";

const FullSpaceLoader = ({ ...props }: SpinnerProps) => {
  return (
    <Center flex={1}>
      <AppSpinner {...props} />
    </Center>
  );
};

export { FullSpaceLoader };
