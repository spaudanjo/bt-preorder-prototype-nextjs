import { Box, Stack } from "@chakra-ui/react";
import React from "react";
import { ShoppingForm, InfoMessageForm, OrderFormQuery } from "../../../lib/graphqlClientTypes";
import { GlobalContext } from "../GlobaContext";
import { getLocalizedContentForCurrentLanguageOrForEnglish } from "../lib/I18n";
import languageMap from "../lib/LanguageMap";
import {
  FlattenedFormViewResult,
  // FormStructureAPIDataEntry,
  FormViewSubmitComponentProps,
} from "../Types";
import FinalSubmitView from "./form-views/FinalSubmitView";
import InfoMessage from "./form-views/InfoMessage";
import LanguageChooser from "./form-views/LanguageChooser";
import MedicalHelpForm from "./form-views/MedicalHelp";
// import { getLocalizedContentForCurrentLanguageOrForEnglish } from "./form-views/NFIShop/helpers";
// import NFIShop from "./form-views/NFIShop/NFIShop";
import TextInput from "./form-views/TextInput";
import NavigationBar from "./NavigationBar";

const FormViewComponent = ({
  formViewData,
  ...props
}: {
  formViewData: (ShoppingForm | InfoMessageForm | undefined);
} & FormViewSubmitComponentProps) => {
  const { currentLanguage } = React.useContext(GlobalContext);
  if(formViewData == null) {
    return null;
  }
  switch (formViewData.__typename) {
    // case "language-chooser": {
    //   return <LanguageChooser {...props} availableLanguages={languageMap} />;
    // }
    // case "medical-help": {
    //   return <MedicalHelpForm {...props} />;
    // }
    case "InfoMessageForm": {
      // console.log(getLocalizedContentForCurrentLanguageOrForEnglish(formViewData, currentLanguage.id))
      return <InfoMessage {...{...props, ...formViewData}} />;
    }
    // case "text-input": {
    //   console.log(getLocalizedContentForCurrentLanguageOrForEnglish(formViewData, currentLanguage.id))
    //   return <TextInput {...{...props, ...getLocalizedContentForCurrentLanguageOrForEnglish(formViewData, currentLanguage.id)}} />;
    // }
    // case "nfi-shop": {
    //   // return <NFIShop {...props} stockData={formViewData.stockData} />;
    //   return <div>NOT IMPLEMENTED YET</div>;
    // }
  }
  return <div>FALLBACK</div>;
};

const FormViewContainer = ({orderFormItems}: {orderFormItems: (ShoppingForm | InfoMessageForm)[]}) => {
  const [formViewIndex, setFormViewIndex] = React.useState(0);
  const [allFlattenedFormViewResults, setAllFlattenedFormViewResults] =
    React.useState<FlattenedFormViewResult>({});

  const onSubmitFormView = (
    flattenedFormViewResult: FlattenedFormViewResult
  ) => {
    setAllFlattenedFormViewResults(
      (prevFlattenedFormViewResult: FlattenedFormViewResult) => ({
        ...prevFlattenedFormViewResult,
        ...flattenedFormViewResult,
      })
    );
    setFormViewIndex((prevFormViewIndex: number) => prevFormViewIndex + 1);
  };

  // const orderFormItems = orderFormData?.orderForm?.orderFormItems;
  const formViewData = orderFormItems?.[formViewIndex];

  const showFinalSubmitView =
    formViewIndex === orderFormItems?.length;

  return (
    <Stack>
      {!showFinalSubmitView && formViewData && (
        <FormViewComponent
          onSubmitFormView={onSubmitFormView}
          formViewData={formViewData}
          formViewId={formViewData.id}
        />
      )}

      {showFinalSubmitView && (
        <FinalSubmitView
          onSubmitFormView={() =>
            alert(
              `Final Submit: ${JSON.stringify(allFlattenedFormViewResults)}}`
            )
          }
        />
      )}

      <NavigationBar
        onClickBack={() =>
          setFormViewIndex((prevFormViewIndex) => prevFormViewIndex - 1)
        }
        canGoBack={formViewIndex > 0}
      />
    </Stack>
  );
};

export default FormViewContainer;
