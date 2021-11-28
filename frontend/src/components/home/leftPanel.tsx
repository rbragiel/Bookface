import React from "react";
import { useColorModeValue, Image, Flex, Heading } from "@chakra-ui/react";
import SocialInteractions from "../../images/social_interactions.svg";

const LeftPanel = () => {
  const bg = useColorModeValue("yellow.200", "gray.900");

  return (
    <Flex
      w={["50%", "50%", "50%", "50%", "30%"]}
      h="100%"
      bg={bg}
      justifyContent="center"
      alignItems="center"
      p={[1, 2, 4]}
      flexDirection="column"
    >
      <Heading as="h1" fontSize="6xl" mb="32" fontWeight="700">
        Bookface
      </Heading>
      <Image
        w="100%"
        maxH="400px"
        loading="lazy"
        src={SocialInteractions}
        alt="Social interactions"
      />
    </Flex>
  );
};

export { LeftPanel };
