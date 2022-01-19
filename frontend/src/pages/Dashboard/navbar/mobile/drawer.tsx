import React from "react";
import {
  Drawer,
  DrawerBody,
  DrawerCloseButton,
  DrawerContent,
  DrawerHeader,
  DrawerOverlay,
  IconButton,
  useDisclosure,
} from "@chakra-ui/react";
import { FaUserFriends } from "react-icons/fa";
import { useTranslation } from "react-i18next";
import { SearchBar } from "../../friends/searchbar";
import { FriendsList } from "../../friends/list";

const FriendsDrawer = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  const { t } = useTranslation();

  return (
    <>
      <IconButton
        aria-label="friends"
        colorScheme="whatsapp"
        icon={<FaUserFriends />}
        onClick={onOpen}
      />
      <Drawer isOpen={isOpen} placement="right" onClose={onClose}>
        <DrawerOverlay />
        <DrawerContent>
          <DrawerCloseButton />
          <DrawerHeader>{t("Your friends:")}</DrawerHeader>
          <DrawerBody>
            <SearchBar />
            <FriendsList />
          </DrawerBody>
        </DrawerContent>
      </Drawer>
    </>
  );
};

export { FriendsDrawer };
