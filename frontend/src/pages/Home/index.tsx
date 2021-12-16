import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { LeftPanel } from "./leftPanel";
import { Login } from "./login";
import { withAllAccess } from "@store/auth/withAllAccess";

const _Home = () => {
  return (
    <Flex w="100%" h="100%" justifyContent="space-between">
      <LeftPanel />
      <Spacer />
      <Login />
    </Flex>
  );
};

const Home = withAllAccess(_Home);

export { Home };
