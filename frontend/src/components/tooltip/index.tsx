import React from "react";
import { MoonIcon, SunIcon } from "@chakra-ui/icons";
import { Button, HStack } from "@chakra-ui/react";
import { ColorMode } from "@styles/theme";
import { TooltipWrapper } from "./wrapper";

const Tooltip = () => {
  return (
    <TooltipWrapper w="100%" p="6" justifyContent="flex-end">
      {({ handleLanguageChange, language, colorMode, toggleColorMode }) => (
        <HStack spacing="6">
          <Button colorScheme="yellow" size="lg" onClick={handleLanguageChange}>
            {language.toLocaleUpperCase()}
          </Button>
          <Button size="lg" onClick={toggleColorMode}>
            {colorMode === ColorMode.DARK ? <SunIcon /> : <MoonIcon />}
          </Button>
        </HStack>
      )}
    </TooltipWrapper>
  );
};

export { Tooltip };
