import React from "react";
import { Flex } from "@chakra-ui/react";

const ContentWrapper: React.FC = ({ children }) => {
  return (
    <Flex padding={3} overflowY="auto" flexDir="column">
      {children}
    </Flex>
  );
};

export { ContentWrapper };
