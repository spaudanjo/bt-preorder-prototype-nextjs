import React from "react";
import { FormViewSubmitComponentProps } from "../../Types";
import { GlobalContext } from "../../GlobaContext";
import I18n from "../../lib/I18n";
import { Box, Button, Stack } from "@chakra-ui/react";

const FinalSubmitView = ({ onSubmitFormView }: {onSubmitFormView: () => void} ) => {
  return (
    <Stack>
        <Button
          onClick={() =>
            onSubmitFormView()
          }
        >
          <I18n k="submitForm.confirm" /> 
        </Button>
    </Stack>
  );
};

export default FinalSubmitView;
