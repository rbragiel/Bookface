import React from "react";
import { Flex, Spacer } from "@chakra-ui/react";
import { RegisterForm } from "../components/register/form";
import { LeftPanel } from "../components/register/leftPanel";

const Register = () => {
  return (
    <Flex w="100%" h="100vh" justifyContent="space-between">
      <LeftPanel />
      <Spacer />
      <RegisterForm />
    </Flex>
  );
};

export { Register };
