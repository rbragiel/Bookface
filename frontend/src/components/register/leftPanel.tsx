import React from "react";
import { useColorModeValue, Flex, Heading, Image } from "@chakra-ui/react";
import RegisterImage from "../../images/register.svg";

const LeftPanel = () => {
  const bg = useColorModeValue("yellow.200", "gray.900");
  const fontColor = useColorModeValue("gray.700", "gray.700");
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
      <Heading
        as="h1"
        fontSize="6xl"
        mb="32"
        fontWeight="700"
        color={fontColor}
      >
        Bookface
      </Heading>
      <Image
        w="100%"
        maxH="400px"
        loading="lazy"
        src={RegisterImage}
        alt="Register"
      />
    </Flex>
  );
};

export { LeftPanel };
