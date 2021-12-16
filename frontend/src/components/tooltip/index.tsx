import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Flex, HStack, useColorMode } from "@chakra-ui/react";
import { Languages } from "@i18n/languages";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { ColorMode } from "@styles/theme";
import { switchToEn, switchToPl } from "@store/i18n";

const Tooltip = () => {
  const { language } = useAppSelector((state) => state.language);
  const dispatch = useAppDispatch();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLanguageChange = () => {
    switch (language) {
      case Languages.EN:
        dispatch(switchToPl());
        break;
      case Languages.PL:
        dispatch(switchToEn());
        break;
      default:
        throw new Error("Language not found");
    }
  };

  return (
    <Flex w="100%" p="6" justifyContent="flex-end">
      <HStack spacing="6">
        <Button colorScheme="yellow" size="lg" onClick={handleLanguageChange}>
          {language.toLocaleUpperCase()}
        </Button>
        <Button size="lg" onClick={toggleColorMode}>
          {colorMode === ColorMode.DARK ? <SunIcon /> : <MoonIcon />}
        </Button>
      </HStack>
    </Flex>
  );
};

export { Tooltip };
