import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { LeftPanel } from "../components/home/leftPanel";
import { Login } from "../components/home/login";

const Home = () => {
  return (
    <Flex w="100%" h="100%" justifyContent="space-between">
      <LeftPanel />
      <Spacer />
      <Login />
    </Flex>
  );
};

export { Home };
