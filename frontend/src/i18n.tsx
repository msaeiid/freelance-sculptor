import LanguageDetector from "i18next-browser-languagedetector";
import Backend from "i18next-http-backend";
import { initReactI18next } from "react-i18next";
import i18n from "i18next";
import en from "./locale/en.json";
import fa from "./locale/fa.json";
import ar from "./locale/ar.json";

export const LanguagesSupported = ["en", "fa", "ar"];

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    interpolation: { escapeValue: false }, // React already does escaping
    debug: false,
    lng: "en", // default language
    supportedLngs: LanguagesSupported,
    fallbackLng: "en",
    resources: {
      en: {
        translation: en,
      },
      fa: {
        translation: fa,
      },
      ar: {
        translation: ar,
      },
    },
  });
