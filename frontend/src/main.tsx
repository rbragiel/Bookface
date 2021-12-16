import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { ChakraProvider, ColorModeScript } from "@chakra-ui/react";
import { Provider } from "react-redux";
import store from "@store";
import App from "./App";
import { theme } from "@styles/theme";
import "@styles/fonts";
import "./i18n";

Sentry.init({
  dsn: "https://2660ec65860542a6998681349acc3ae4@o1072772.ingest.sentry.io/6072035",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <ChakraProvider theme={theme}>
        <ColorModeScript initialColorMode={theme.config.initialColorMode} />
        <App />
      </ChakraProvider>
    </Provider>
  </React.StrictMode>,
  document.getElementById("root")
);
