import React from "react";
import { withRestrictedAccess } from "@store/auth/withRestictedAccess";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { Friends } from "./friends";
import { Navbar } from "./navbar";

const _Dashboard = () => {
  return (
    <Flex w="100%" h="100%">
      <Friends />
      <Flex flex="1" h="100%" flexDirection="column">
        <Navbar />
        <Outlet />
      </Flex>
    </Flex>
  );
};

const Dashboard = withRestrictedAccess(_Dashboard);

export { Dashboard };
