import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, Flex, HStack, useColorMode } from "@chakra-ui/react";
import React from "react";
import { Languages } from "../../i18n/languages";
import { useLanguage } from "../../i18n/store";
import { ColorMode } from "../../styles/theme";

const Tooltip = () => {
  const { language, switchToEn, switchToPl } = useLanguage();
  const { colorMode, toggleColorMode } = useColorMode();

  const handleLanguageChange = () => {
    switch (language) {
      case Languages.EN:
        switchToPl();
        break;
      case Languages.PL:
        switchToEn();
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
