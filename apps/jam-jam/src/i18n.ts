import i18n from "i18next";
import { initReactI18next } from "react-i18next";

import Backend from "i18next-http-backend";
import LanguageDetector from "i18next-browser-languagedetector";

export const SUPPORTED_LNGS = ["en", "pl"];
export const [ENG_LNG] = SUPPORTED_LNGS;

i18n
  .use(new Backend())
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    fallbackLng: ENG_LNG,
    supportedLngs: SUPPORTED_LNGS,
    debug: false,
    interpolation: {
      escapeValue: false,
    },
    react: {
      useSuspense: false,
    },
  });

export default i18n;
