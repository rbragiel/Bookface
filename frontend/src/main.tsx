import React from "react";
import ReactDOM from "react-dom";
import * as Sentry from "@sentry/react";
import { Integrations } from "@sentry/tracing";
import { ChakraProvider } from "@chakra-ui/react";
import App from "./App";

Sentry.init({
  dsn: "https://2660ec65860542a6998681349acc3ae4@o1072772.ingest.sentry.io/6072035",
  integrations: [new Integrations.BrowserTracing()],
  tracesSampleRate: 1.0,
});

ReactDOM.render(
  <React.StrictMode>
    <ChakraProvider>
      <App />
    </ChakraProvider>
  </React.StrictMode>,
  document.getElementById("root")
);
