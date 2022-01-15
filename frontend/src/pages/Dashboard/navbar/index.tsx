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
import { useTranslation } from "react-i18next";
import { useAppDispatch } from "@store/hooks";
import { CreatePostModal } from "./createPostModal";
import { useAppSelector } from "../../../store/hooks";
import { open, close } from "@store/post";
import { AiOutlineLogout, AiOutlineUser } from "react-icons/ai";
import { logout } from "@store/auth";

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
    title: "Friends",
  },
  {
    to: "/dashboard/invitations",
    title: "Invites",
  },
];

const Navbar = () => {
  const bg = useColorModeValue("yellow.200", "gray.900");
  const borderColor = useColorModeValue("gray.200", "yellow.200");
  const textColor = useColorModeValue("gray.900", "yellow.200");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.postCreate.postCreateOpen);

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
          {t(link.title)}
        </Link>
      ))}
      <TooltipWrapper>
        {({ colorMode, handleLanguageChange, language, toggleColorMode }) => (
          <HStack spacing="4">
            <Button onClick={toggleColorMode} color={textColor}>
              {colorMode === ColorMode.DARK ? <SunIcon /> : <MoonIcon />}
            </Button>
            <Button onClick={handleLanguageChange} colorScheme="teal">
              {language.toUpperCase()}
            </Button>
            <Button
              colorScheme="linkedin"
              as={RouterLink}
              to="/dashboard/profile"
            >
              <AiOutlineUser />
            </Button>
            <Button colorScheme="whatsapp" onClick={() => dispatch(logout())}>
              <AiOutlineLogout />
            </Button>

            <Button
              color={textColor}
              onClick={() => {
                dispatch(open());
              }}
            >
              {t("Create new post")}
            </Button>
          </HStack>
        )}
      </TooltipWrapper>
      {isOpen && (
        <CreatePostModal
          close={() => {
            dispatch(close());
          }}
          isOpen={isOpen}
        />
      )}
    </Flex>
  );
};

export { Navbar };
