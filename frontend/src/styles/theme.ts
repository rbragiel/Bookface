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
  styles: {
    global: {
      "html, body": {
        height: "100%",
        width: "100%",
      },
      "#root": {
        width: "100%",
        height: "100%",
        overflow: "hidden",
      },
    },
  },
});

export { theme, ColorMode };
