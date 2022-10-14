import { extendTheme, type ThemeConfig } from "@chakra-ui/react";

const config: ThemeConfig = {
  initialColorMode: "light",
  useSystemColorMode: false,
};

const theme = extendTheme({
  config,
  semanticTokens: {
    colors: {
      accent: {
        default: "teal.500",
        _dark: "teal.200",
      },
      accentText: {
        default: "#fff",
        _dark: "#000",
      },
      bgNavBar: {
        default: "whiteAlpha.800",
        _dark: "rgba(26, 32, 44, 0.8)",
      },
      bgCard: {
        default: "gray.100",
        _dark: "whiteAlpha.200",
      },
      textError: {
        default: "red.500",
        _dark: "red.300",
      },
    },
  },
});

export default theme;
