import React from "react";
import {
  Button,
  ButtonGroup,
  Flex,
  IconButton,
  Link,
  Tooltip,
} from "@chakra-ui/react";
import { Friend } from "@store/friends/types";
import { Link as RouterLink } from "react-router-dom";
import { ChatIcon, DeleteIcon } from "@chakra-ui/icons";

interface FriendListElProps {
  friend: Friend;
}

const FriendListEl = React.memo(({ friend }: FriendListElProps) => {
  return (
    <Flex
      justifyContent="space-between"
      alignItems="center"
      paddingX={2}
      paddingY={1}
    >
      <Tooltip label="Click to see more about your friend.">
        <Link
          as={RouterLink}
          to={`/dashboard/users/${friend.userId}`}
          fontWeight={600}
        >
          {friend.nickname}
        </Link>
      </Tooltip>
      <ButtonGroup size="sm" isAttached variant="outline">
        <Button
          as={RouterLink}
          to={`/dashboard/chat/${friend.userId}`}
          mr="1"
          colorScheme="teal"
        >
          <ChatIcon mr="1" /> Chat
        </Button>
        <Tooltip label="Delete a friend.">
          <IconButton
            aria-label="Add to friends"
            icon={<DeleteIcon />}
            colorScheme="yellow"
          />
        </Tooltip>
      </ButtonGroup>
    </Flex>
  );
});

FriendListEl.displayName = "FriendListEl";

export { FriendListEl };
