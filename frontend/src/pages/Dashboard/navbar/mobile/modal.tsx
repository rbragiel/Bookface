import React from "react";
import {
  Button,
  HStack,
  IconButton,
  Link,
  Modal,
  ModalBody,
  ModalCloseButton,
  ModalContent,
  ModalHeader,
  ModalOverlay,
  Stack,
  Text,
  useColorModeValue,
  useDisclosure,
} from "@chakra-ui/react";
import { AiOutlineMenu, AiOutlineLogout } from "react-icons/ai";
import { useTranslation } from "react-i18next";
import { links } from "..";
import { Link as RouterLink } from "react-router-dom";
import { logout } from "@store/auth";
import { useAppDispatch } from "@store/hooks";
import { useMediaQuery } from "@chakra-ui/react";
import { Breakpoints } from "@contants/breakpoints";
import { TooltipWrapper } from "@components/tooltip/wrapper";
import { SunIcon, MoonIcon } from "@chakra-ui/icons";
import { ColorMode } from "@styles/theme";

const MobileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const textColor = useColorModeValue("gray.900", "yellow.200");
  const dispatch = useAppDispatch();
  const [isXss] = useMediaQuery(Breakpoints.xss);

  return (
    <>
      <IconButton
        aria-label="menu"
        icon={<AiOutlineMenu />}
        colorScheme="teal"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size={isXss ? "full" : "xl"}>
        <ModalOverlay />
        <ModalContent py={6} px={4}>
          <ModalHeader>{t("Menu")}</ModalHeader>
          <ModalCloseButton />
          <ModalBody>
            <Stack spacing={6}>
              {links.map((link) => (
                <Link
                  variant="link"
                  as={RouterLink}
                  to={link.to}
                  key={link.to}
                  fontWeight={500}
                  color={textColor}
                  onClick={onClose}
                >
                  {t(link.title)}
                </Link>
              ))}
              <Link
                variant="link"
                as={RouterLink}
                fontWeight={500}
                color={textColor}
                onClick={onClose}
                to="/dashboard/profile"
              >
                {t("Your profile")}
              </Link>
              <Link
                colorScheme="whatsapp"
                onClick={() => {
                  onClose();
                  dispatch(logout());
                }}
                display="flex"
                alignItems="center"
                fontWeight={500}
                color={textColor}
              >
                <Text mr={2}>{t("Logout")}</Text> <AiOutlineLogout />
              </Link>

              <TooltipWrapper>
                {({
                  colorMode,
                  handleLanguageChange,
                  language,
                  toggleColorMode,
                }) => (
                  <HStack spacing="4">
                    <Button onClick={toggleColorMode} color={textColor}>
                      {colorMode === ColorMode.DARK ? (
                        <SunIcon />
                      ) : (
                        <MoonIcon />
                      )}
                    </Button>
                    <Button onClick={handleLanguageChange} colorScheme="teal">
                      {language.toUpperCase()}
                    </Button>
                  </HStack>
                )}
              </TooltipWrapper>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { MobileModal };
