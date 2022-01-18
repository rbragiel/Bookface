import React from "react";
import {
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

const MobileModal = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { t } = useTranslation();
  const textColor = useColorModeValue("gray.900", "yellow.200");
  const dispatch = useAppDispatch();

  return (
    <>
      <IconButton
        aria-label="menu"
        icon={<AiOutlineMenu />}
        colorScheme="teal"
        onClick={onOpen}
      />
      <Modal isOpen={isOpen} onClose={onClose} size="xl">
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
              >
                <Text mr={2}>{t("Logout")}</Text> <AiOutlineLogout />
              </Link>
            </Stack>
          </ModalBody>
        </ModalContent>
      </Modal>
    </>
  );
};

export { MobileModal };
