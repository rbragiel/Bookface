import React from "react";
import {
  Stack,
  Input,
  InputGroup,
  InputLeftElement,
  useDisclosure,
} from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { SearchModal } from "./modal";

const SearchBar = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();

  return (
    <Stack w="100%" position="relative">
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          type="text"
          name="search"
          placeholder="Search for user"
          onClick={onOpen}
        />
      </InputGroup>
      <SearchModal isOpen={isOpen} close={onClose} />
    </Stack>
  );
};

export { SearchBar };
