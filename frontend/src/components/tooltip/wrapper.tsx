import React from "react";
import { useColorMode, Flex, ColorMode, FlexProps } from "@chakra-ui/react";
import { Languages } from "@i18n/languages";
import { useAppSelector, useAppDispatch } from "@store/hooks";
import { switchToPl, switchToEn } from "@store/i18n";

interface TooltipWrapperProps {
  children: (args: {
    colorMode: ColorMode;
    toggleColorMode: () => void;
    language: Languages;
    handleLanguageChange: () => void;
  }) => React.ReactNode;
}

const TooltipWrapper = (props: TooltipWrapperProps & FlexProps) => {
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

  const { children, ...rest } = props;

  return (
    <Flex {...rest}>
      {children({ colorMode, toggleColorMode, language, handleLanguageChange })}
    </Flex>
  );
};

export { TooltipWrapper };
