import React from "react";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex h="100%" flexDir="column" w="100%">
      <Outlet />
    </Flex>
  );
};

export { Layout };
