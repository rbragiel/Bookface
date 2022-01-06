import {
  Button,
  Flex,
  HStack,
  Link,
  useColorModeValue,
} from "@chakra-ui/react";
import React from "react";
import { TooltipWrapper } from "@components/tooltip/wrapper";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { ColorMode } from "@styles/theme";
import { Link as RouterLink } from "react-router-dom";

interface NavbarLink {
  to: string;
  title: string;
}

const links: NavbarLink[] = [
  {
    to: "/dashboard",
    title: "Main",
  },
  {
    to: "/dashboard/friends",
    title: "Your friends",
  },
  {
    to: "/dashboard/invitations",
    title: "Your invitations",
  },
];

const Navbar = () => {
  const bg = useColorModeValue("yellow.200", "gray.900");
  const borderColor = useColorModeValue("gray.200", "yellow.200");
  const textColor = useColorModeValue("gray.900", "yellow.200");

  return (
    <Flex
      as={"header"}
      bg={bg}
      w="100%"
      p={[1, 2, 4]}
      borderBottomWidth={3}
      borderBottomStyle="solid"
      borderBottomColor={borderColor}
      justifyContent="space-evenly"
      alignItems="center"
    >
      {links.map((link) => (
        <Link
          as={RouterLink}
          to={link.to}
          key={link.to}
          fontWeight={500}
          color={textColor}
        >
          {link.title}
        </Link>
      ))}
      <TooltipWrapper>
        {({ colorMode, handleLanguageChange, language, toggleColorMode }) => (
          <HStack spacing="4">
            <Button onClick={handleLanguageChange} color={textColor}>
              {language.toLocaleUpperCase()}
            </Button>
            <Button onClick={toggleColorMode} color={textColor}>
              {colorMode === ColorMode.DARK ? <SunIcon /> : <MoonIcon />}
            </Button>
          </HStack>
        )}
      </TooltipWrapper>
    </Flex>
  );
};

export { Navbar };
