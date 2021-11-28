import { extendTheme, ThemeConfig } from "@chakra-ui/react";

enum ColorMode {
  LIGHT = "light",
  DARK = "dark",
}

const config: ThemeConfig = {
  initialColorMode: ColorMode.LIGHT,
  useSystemColorMode: false,
};

const theme = extendTheme({
  fonts: {
    heading: "Inter",
    body: "Inter",
  },
  config,
});

export { theme, ColorMode };
