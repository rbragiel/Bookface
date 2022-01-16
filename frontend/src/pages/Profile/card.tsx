import {
  Flex,
  useColorModeValue,
  Stack,
  Avatar,
  Box,
  Heading,
  Text,
} from "@chakra-ui/react";
import React from "react";

const Card = () => {
  return (
    <Flex
      backgroundColor={useColorModeValue("gray.100", "gray.900")}
      padding={4}
      flexDirection="column"
      borderRadius={10}
      maxWidth="1200px"
      alignSelf="center"
      w="100%"
    >
      <Stack w="100%" direction="row" alignItems="center" spacing={6}>
        <Avatar
          size="2xl"
          src="https://images.unsplash.com/photo-1520810627419-35e362c5dc07?ixlib=rb-1.2.1&q=80&fm=jpg&crop=faces&fit=crop&h=200&w=200&ixid=eyJhcHBfaWQiOjE3Nzg0fQ"
          alt="Avatar"
          mb={4}
        />
        <Flex justifyContent="space-between" alignItems="center" flex={1}>
          <Box>
            <Heading fontSize="2xl" fontFamily="body"></Heading>
            <Text fontWeight={600} color="gray.500"></Text>
          </Box>
        </Flex>
      </Stack>
    </Flex>
  );
};

export { Card };
