import React from "react";
import { useColorModeValue, Link, Button, HStack } from "@chakra-ui/react";
import { TooltipWrapper } from "@components/tooltip/wrapper";
import { useTranslation } from "react-i18next";
import { links } from ".";
import { Link as RouterLink } from "react-router-dom";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { logout } from "@store/auth";
import { AiOutlineUser, AiOutlineLogout } from "react-icons/ai";
import { ColorMode } from "@styles/theme";
import { useAppDispatch } from "@store/hooks";
import { open } from "@store/post";

const DesktopNav = () => {
  const textColor = useColorModeValue("gray.900", "yellow.200");
  const { t } = useTranslation();
  const dispatch = useAppDispatch();

  return (
    <>
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
    </>
  );
};

export { DesktopNav };
