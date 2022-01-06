import React from "react";
import { Heading, Stack, useColorModeValue } from "@chakra-ui/react";
import { SearchBar } from "./searchbar";
import { FriendsList } from "./list";

const Friends = () => {
  const borderColor = useColorModeValue("gray.200", "yellow.200");

  return (
    <Stack
      maxWidth="500"
      w="30%"
      h="100%"
      p={[1, 2, 4]}
      borderRightWidth={3}
      borderRightStyle="solid"
      borderRightColor={borderColor}
      overflow="auto"
      spacing="6"
    >
      <SearchBar />
      <Heading as="h6" fontSize="xl" textAlign="center">
        Your friends:
      </Heading>
      <FriendsList />
    </Stack>
  );
};

export { Friends };
