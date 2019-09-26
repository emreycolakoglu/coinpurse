import i18n from "i18next";
import LanguageDetector from "i18next-browser-languagedetector";
import sprintf from 'i18next-sprintf-postprocessor';
import { initReactI18next } from "react-i18next";

const tr = require("./translations/tr.json");
const en = require("./translations/en.json");

i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .use(sprintf)
  .init({
    ns: "coinpurse",
    fallbackLng: "tr",
    debug: process.env.ENV == "development",
    interpolation: {
      escapeValue: false
    },
    resources: {
      tr: { coinpurse: tr },
      en: { coinpurse: en }
    },
    keySeparator: "."
  });

export default i18n;
