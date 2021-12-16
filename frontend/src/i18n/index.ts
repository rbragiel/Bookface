import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import { Languages } from "./languages";
import en from "./translations/en.json";
import pl from "./translations/pl.json";

const resources = {
  [Languages.EN]: { translation: en },
  [Languages.PL]: { translation: pl },
};

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    keySeparator: false,
    interpolation: {
      escapeValue: false,
    },
  });

export default i18n;
