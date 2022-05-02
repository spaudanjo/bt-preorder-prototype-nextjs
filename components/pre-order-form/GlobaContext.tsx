import React from "react";
import languageMap from "./lib/LanguageMap";
import { Language, LanguageMap } from "./Types";


interface IGlobalContext {
  currentLanguage: Language;
  setCurrentLanguage: React.Dispatch<React.SetStateAction<Language>>;
}
export const GlobalContext = React.createContext<IGlobalContext>({} as IGlobalContext);

const GlobalContextProvider = ({
  children,
  languageMap,
}: {
  children: React.ReactNode;
  languageMap: LanguageMap;
}) => {
  const [currentLanguage, setCurrentLanguage] = React.useState(languageMap.en);

  return (
    <GlobalContext.Provider value={{ currentLanguage, setCurrentLanguage }}>
      {children}
    </GlobalContext.Provider>
  );
}

export default GlobalContextProvider;
