import React, { useState } from "react";
import { FormViewSubmitComponentProps } from "../../Types";
import { Box, Button, Heading, Stack, Textarea } from "@chakra-ui/react";
import I18n from "../../lib/I18n";

interface TextInputFormViewProps extends FormViewSubmitComponentProps {
  title: string;
  description: string;
}

const TextInput = ({ onSubmitFormView, formViewId, title, description }: TextInputFormViewProps ) => {
  const [text, setText] = useState("");
  return (
    <Stack>
      <Heading>{title}</Heading>
      <Textarea value={text} onChange={(event) => setText(event.target.value)} placeholder={description} />
      <Button onClick={() => onSubmitFormView({
            [`textInputForm_${formViewId}_.text`]: text,
          })}><I18n k="general.continue" /></Button>
    </Stack>
  );
};

export default TextInput;
