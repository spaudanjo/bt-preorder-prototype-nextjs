import React from "react";
import { FormViewSubmitComponentProps, Language, LanguageMap } from "../../Types";
import { GlobalContext } from "../../GlobaContext";
import I18n from "../../lib/I18n";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

const LanguageChooser = ({ onSubmitFormView, formViewId, availableLanguages }: FormViewSubmitComponentProps & { availableLanguages: LanguageMap}) => {
  const { currentLanguage, setCurrentLanguage } = React.useContext(GlobalContext);

  const onChooseLanguage = (language: Language) => {
    setCurrentLanguage(language);
    onSubmitFormView({
      [`languageChooserForm_${formViewId}_.language`]: language.id,
    });
  }

  return (
    <Box>
      <Heading>
        <I18n k="languageChooser.title" />
      </Heading>
      <Text><I18n k="languageChooser.description" /></Text>
      {/* <p>
        <label htmlFor="help-needed"></label>
        <input type="text" id="help-needed" />
      </p> */}
        {Object.keys(availableLanguages).map(languageKey => {
          const language = availableLanguages[languageKey];
          return <Button key={language.id} onClick={() => onChooseLanguage(language)}>{language.name}</Button>;
        })}
    </Box>
  );
};

export default LanguageChooser;
