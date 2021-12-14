import { createSlice } from "@reduxjs/toolkit";
import i18n from "../../i18n";
import { Languages } from "../../i18n/languages";

interface LanguageStoreValue {
  language: Languages.EN | Languages.PL;
}

const initialState: LanguageStoreValue = { language: Languages.EN };

const languageSlice = createSlice({
  name: "language",
  initialState,
  reducers: {
    switchToEn: (state) => {
      i18n.changeLanguage(Languages.EN);
      state.language = Languages.EN;
    },
    switchToPl: (state) => {
      i18n.changeLanguage(Languages.PL);
      state.language = Languages.PL;
    },
  },
});

export const { switchToEn, switchToPl } = languageSlice.actions;

export default languageSlice.reducer;
