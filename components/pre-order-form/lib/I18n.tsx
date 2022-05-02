import React from "react";
import { GlobalContext } from "../GlobaContext";
import { FormDataWithLocalizedContent } from "../Types";

const I18n = ({ k: tKey }: { k: string }) => {
  const { currentLanguage } = React.useContext(GlobalContext);
  const dictionary = currentLanguage.dictionary;
  return <span>{dictionary[tKey] || tKey}</span>;
};

export const getLocalizedContentForCurrentLanguageOrForEnglish = (
  infoMessageFormData: FormDataWithLocalizedContent,
  languageId: string
) => infoMessageFormData.localizedContent[languageId] ||
  infoMessageFormData.localizedContent["en"];
  
export default I18n