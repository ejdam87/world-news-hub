import i18n from "i18next";
import { initReactI18next } from "react-i18next";

const resources = {
  en: {
    translation: {
        "World news hub": "World news hub",
      "Welcome to the World news hub!": "Welcome to the World news hub!"
    }
  },
  es: {
    translation: {
        "World news hub": "Ola pola",
      "Welcome to the World news hub!": "Ola"
    }
  }
};

i18n.use(initReactI18next).init({
    resources,
    lng: "en",
    interpolation: {
        escapeValue: false
    }
});

export default i18n;
