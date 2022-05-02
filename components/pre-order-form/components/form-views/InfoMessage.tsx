import React from "react";
import { FormViewSubmitComponentProps } from "../../Types";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

interface InfoMessageFormViewProps extends FormViewSubmitComponentProps {
  title: string;
  description: string;
}

const InfoMessage = ({ onSubmitFormView, formViewId, title, description }: InfoMessageFormViewProps ) => {
  return (
    <Box>
      <Heading>{title}</Heading>
      <Text>{description}</Text>
      {/* <p>
        <label htmlFor="help-needed"></label>
        <input type="text" id="help-needed" />
      </p> */}
      <Button onClick={() => onSubmitFormView({})}>Ok</Button>
    </Box>
  );
};

export default InfoMessage;
