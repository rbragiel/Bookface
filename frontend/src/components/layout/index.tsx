import React from "react";
import { Flex } from "@chakra-ui/react";
import { Outlet } from "react-router-dom";

const Layout = () => {
  return (
    <Flex minH="100vh" h="100%" flexDir="column" w="100%">
      <Outlet />
    </Flex>
  );
};

export { Layout };
