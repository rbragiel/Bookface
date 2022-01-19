import React from "react";
import {
  useColorModeValue,
  Flex,
  Heading,
  Image,
  useMediaQuery,
} from "@chakra-ui/react";
import RegisterImage from "../../images/register.svg";
import { Breakpoints } from "@contants/breakpoints";

const LeftPanel = () => {
  const bg = useColorModeValue("yellow.200", "gray.900");
  const [isSm] = useMediaQuery(Breakpoints.xs);

  return (
    <Flex
      w={isSm ? "100%" : ["50%", "50%", "50%", "50%", "30%"]}
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
        src={RegisterImage}
        alt="Register"
      />
    </Flex>
  );
};

export { LeftPanel };
