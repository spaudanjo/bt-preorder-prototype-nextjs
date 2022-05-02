import React from "react";
import { FormViewSubmitComponentProps } from "../../Types";
import { Box, Button, Heading, Text } from "@chakra-ui/react";

interface InfoMessageFormViewProps extends FormViewSubmitComponentProps {
  // title: string;
  // description: string;
  infoMessage: string;
}

const InfoMessage = ({ onSubmitFormView, infoMessage }: InfoMessageFormViewProps ) => {
  return (
    <Box>
      {/* <Heading>{title}</Heading> */}
      <Text>{infoMessage}</Text>
      {/* <p>
        <label htmlFor="help-needed"></label>
        <input type="text" id="help-needed" />
      </p> */}
      <Button onClick={() => onSubmitFormView({})}>Ok</Button>
    </Box>
  );
};

export default InfoMessage;
