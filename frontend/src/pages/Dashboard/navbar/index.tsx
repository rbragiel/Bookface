import React from "react";
import {
  Flex,
  Heading,
  HStack,
  IconButton,
  useColorModeValue,
} from "@chakra-ui/react";
import { useAppDispatch } from "@store/hooks";
import { useAppSelector } from "@store/hooks";
import { close, open } from "@store/post";
import { useMediaQuery } from "@chakra-ui/react";
import { Breakpoints } from "@contants/breakpoints";
import { FriendsDrawer } from "./mobile/drawer";
import { DesktopNav } from "./desktopNav";
import { CreatePostModal } from "./createPostModal";
import { MobileModal } from "./mobile/modal";
import { MdCreate } from "react-icons/md";

interface NavbarLink {
  to: string;
  title: string;
}

export const links: NavbarLink[] = [
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
  const dispatch = useAppDispatch();
  const postCreateOpen = useAppSelector(
    (state) => state.postCreate.postCreateOpen
  );

  const [isMd] = useMediaQuery(Breakpoints.md);

  return (
    <Flex
      as={"header"}
      bg={bg}
      w="100%"
      p={isMd ? 3 : [1, 2, 4]}
      borderBottomWidth={3}
      borderBottomStyle="solid"
      borderBottomColor={borderColor}
      justifyContent={isMd ? "space-between" : "space-evenly"}
      alignItems="center"
    >
      {isMd ? (
        <>
          <Heading>Bookface</Heading>
          <HStack>
            <IconButton
              aria-label="create post"
              icon={<MdCreate />}
              onClick={() => dispatch(open())}
            />
            <FriendsDrawer />
            <MobileModal />
          </HStack>
        </>
      ) : (
        <DesktopNav />
      )}

      {postCreateOpen && (
        <CreatePostModal
          close={() => {
            dispatch(close());
          }}
          isOpen={postCreateOpen}
        />
      )}
    </Flex>
  );
};

export { Navbar };
