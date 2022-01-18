import React from "react";
import { Flex, Spacer, useMediaQuery } from "@chakra-ui/react";
import { LeftPanel } from "./leftPanel";
import { Login } from "./login";
import { withAllAccess } from "@store/auth/withAllAccess";
import { Breakpoints } from "@contants/breakpoints";

const _Home = () => {
  const [isSm] = useMediaQuery(Breakpoints.sm);

  return (
    <Flex
      w="100%"
      h="100%"
      justifyContent="space-between"
      flexDir={isSm ? "column" : "row"}
      overflow="auto"
    >
      <LeftPanel />
      <Spacer />
      <Login />
    </Flex>
  );
};

const Home = withAllAccess(_Home);

export { Home };
