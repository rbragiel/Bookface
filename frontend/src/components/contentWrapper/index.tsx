import React from "react";
import { Flex, FlexProps } from "@chakra-ui/react";

const ContentWrapper: React.FC<FlexProps> = ({ children, ...rest }) => {
  return (
    <Flex {...rest} padding={3} overflowY="auto" flexDir="column">
      {children}
    </Flex>
  );
};

export { ContentWrapper };
