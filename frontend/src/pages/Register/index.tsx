import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { RegisterForm } from "./form";
import { LeftPanel } from "./leftPanel";
import { withAllAccess } from "@store/auth/withAllAccess";
import { useMediaQuery } from "@chakra-ui/react";
import { Breakpoints } from "@contants/breakpoints";

const _Register = () => {
  const [isSm] = useMediaQuery(Breakpoints.xs);

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
      <RegisterForm />
    </Flex>
  );
};

const Register = withAllAccess(_Register);

export { Register };
