import React from "react";
import { Heading, useColorModeValue, Flex } from "@chakra-ui/react";
import { SearchBar } from "./searchbar";
import { FriendsList } from "./list";
import { useTranslation } from "react-i18next";

const Friends = () => {
  const borderColor = useColorModeValue("gray.200", "yellow.200");
  const { t } = useTranslation();

  return (
    <Flex
      maxWidth="500px"
      minW="300px"
      w="30%"
      h="100%"
      p={[1, 2, 4]}
      borderRightWidth={3}
      borderRightStyle="solid"
      borderRightColor={borderColor}
      overflow="auto"
      flexDir="column"
    >
      <SearchBar />
      <Heading as="h6" fontSize="xl" textAlign="center" mt={6}>
        {t("Your friends:")}
      </Heading>
      <FriendsList />
    </Flex>
  );
};

export { Friends };
