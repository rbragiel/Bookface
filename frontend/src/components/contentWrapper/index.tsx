import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

const ContentWrapper: React.FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex height="100%" {...rest} padding={3} overflowY="auto" flexDir="column">
      {children}
    </Flex>
  );
};

export { ContentWrapper };
