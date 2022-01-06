import React from "react";
import { withRestrictedAccess } from "@store/auth/withRestictedAccess";
import { Outlet } from "react-router-dom";
import { Flex } from "@chakra-ui/react";
import { FriendsList } from "./friends";

const _Dashboard = () => {
  return (
    <Flex w="100%" h="100%">
      <FriendsList />
      <Flex w="70%" h="100%">
        <Outlet />
      </Flex>
    </Flex>
  );
};

const Dashboard = withRestrictedAccess(_Dashboard);

export { Dashboard };
