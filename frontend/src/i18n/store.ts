import { createStore, createEvent } from "effector";
import { useStore } from "effector-react";
import { Languages } from "./languages";
import i18n from "./";

type LanguageStoreValue = Languages.EN | Languages.PL;

const switchToEn = createEvent<void>();
const switchToPl = createEvent<void>();

const $languageStore = createStore<LanguageStoreValue>(Languages.EN)
  .on(switchToEn, () => {
    i18n.changeLanguage(Languages.EN);
    return Languages.EN;
  })
  .on(switchToPl, () => {
    i18n.changeLanguage(Languages.PL);
    return Languages.PL;
  });

const useLanguage = () => {
  const language = useStore($languageStore);

  return { language, switchToEn, switchToPl };
};

export { useLanguage };
