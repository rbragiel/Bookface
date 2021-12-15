import { createSlice } from "@reduxjs/toolkit";
import i18n from "@i18n";
import { Languages } from "@i18n/languages";

interface LanguageStoreValue {
  language: Languages.EN | Languages.PL;
}

const LANGUAGE_KEY = "i18nextLng";

const initialState: LanguageStoreValue = {
  language: (localStorage.getItem(LANGUAGE_KEY) as Languages) || Languages.EN,
};

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    switchToEn: (state) => {
      i18n.changeLanguage(Languages.EN);
      localStorage.setItem(LANGUAGE_KEY, Languages.EN);
      state.language = Languages.EN;
    },
    switchToPl: (state) => {
      i18n.changeLanguage(Languages.PL);
      localStorage.setItem(LANGUAGE_KEY, Languages.PL);
      state.language = Languages.PL;
    },
  },
});

export const { switchToEn, switchToPl } = languageSlice.actions;

export default languageSlice.reducer;
