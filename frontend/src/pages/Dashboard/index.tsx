import React from "react";
import { withRestrictedAccess } from "@store/auth/withRestictedAccess";
import { Outlet } from "react-router-dom";
import { Flex, useMediaQuery } from "@chakra-ui/react";
import { Friends } from "./friends";
import { Navbar } from "./navbar";
import { Breakpoints } from "@contants/breakpoints";

const _Dashboard = () => {
  const [isSm] = useMediaQuery(Breakpoints.sm);

  return (
    <Flex w="100%" h="100%">
      <Friends />
      <Flex flex="1" h="100%" flexDirection="column" w={isSm ? "100%" : "auto"}>
        <Navbar />
        <Outlet />
      </Flex>
    </Flex>
  );
};

const Dashboard = withRestrictedAccess(_Dashboard);

export { Dashboard };
