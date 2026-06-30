import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import ICU from "i18next-icu";
import { initReactI18next } from "react-i18next";

import ru from "./locales/ru.json";
import tj from "./locales/tj.json";

export const resources = {
  ru: { translation: ru },
  tj: { translation: tj },
};

i18n
  // detect user language (save selected lng into localStorage)
  .use(ICU)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources,
    debug: import.meta.env.DEV,
    fallbackLng: "ru",
    interpolation: {
      // react already safes from xss
      escapeValue: false,
    },
  });

export default i18n;
