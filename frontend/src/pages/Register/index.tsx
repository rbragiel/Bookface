import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { RegisterForm } from "./form";
import { LeftPanel } from "./leftPanel";
import { withAllAccess } from "@store/auth/withAllAccess";

const _Register = () => {
  return (
    <Flex w="100%" h="100%" justifyContent="space-between">
      <LeftPanel />
      <Spacer />
      <RegisterForm />
    </Flex>
  );
};

const Register = withAllAccess(_Register);

export { Register };
