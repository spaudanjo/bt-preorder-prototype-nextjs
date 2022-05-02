import FormViewContainer from "./components/FormViewContainer";
import { Center, Container, Stack } from "@chakra-ui/react";
import languageMap from "./lib/LanguageMap";
import GlobalContextProvider from "./GlobaContext";
import { ShoppingForm, InfoMessageForm } from "../../lib/graphqlClientTypes";

function PreOrderForm({orderFormItems}: {orderFormItems: (ShoppingForm | InfoMessageForm)[]}) {
  return (
    <GlobalContextProvider languageMap={languageMap}>
      <FormViewContainer orderFormItems={orderFormItems} />
    </GlobalContextProvider>
  );
}

export default PreOrderForm;
