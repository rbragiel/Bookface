import React from "react";
import { Stack, Input, InputGroup, InputLeftElement } from "@chakra-ui/react";
import { SearchIcon } from "@chakra-ui/icons";
import { SearchModal } from "./modal";
import { useAppDispatch, useAppSelector } from "@store/hooks";
import { open, close } from "@store/searchbar";
import { useTranslation } from "react-i18next";

const SearchBar = () => {
  const dispatch = useAppDispatch();
  const isOpen = useAppSelector((state) => state.searchbar.searchbarOpen);
  const { t } = useTranslation();

  return (
    <Stack w="100%" position="relative">
      <InputGroup>
        <InputLeftElement>
          <SearchIcon />
        </InputLeftElement>
        <Input
          type="text"
          name="search"
          placeholder={t("Search for user")}
          onClick={() => dispatch(open())}
        />
      </InputGroup>
      <SearchModal isOpen={isOpen} close={() => dispatch(close())} />
    </Stack>
  );
};

export { SearchBar };
