import React, { useState } from "react";
import { GlobalContext } from "../../../GlobaContext";
import I18n from "../../../lib/I18n";
import ProductDetailView from "./ProductDetailView";
import { getLocalizedContentForCurrentLanguageOrForEnglish } from "../../../lib/I18n";
import { Button, Center, Grid, Heading, Stack } from "@chakra-ui/react";
import { FormViewSubmitComponentProps } from "../../../Types";

interface NormalisedAndLocalisedProductTypeTuple {
  normalised: string;
  localised: string;
}

const NFIShop = ({
  onSubmitFormView,
  formViewId,
  stockData,
}: FormViewSubmitComponentProps & { stockData: StockData }) => {
  const { currentLanguage } = React.useContext(GlobalContext);
  const [productTypeForDetailView, setProductTypeForDetailView] =
    useState<string>();

  const getProductsByProductType = (productType: string) => {
    return stockData.filter((product) => product.productType === productType);
  };

  const normalisedAndLocalisedProductTypeTuples = stockData.reduce<{
    [key: string]: NormalisedAndLocalisedProductTypeTuple;
  }>((acc, product) => {
    const localizedProductDetails =
      getLocalizedProductDetailsForCurrentLanguageOrForEnglish(
        product,
        currentLanguage.id
      );
    return {
      ...acc,
      [product.productType]: {
        normalised: product.productType,
        localised: localizedProductDetails.productType,
      },
    };
  }, {});

  return (
    <Stack>
      {productTypeForDetailView && (
        <ProductDetailView
          // isOpen={productTypeForDetailView != null}
          onClose={() => setProductTypeForDetailView(undefined)}
          // productType={productTypeForDetailView}
          productsForType={getProductsByProductType(productTypeForDetailView)}
          // onAddToCart={}
        />
      )}
      <Heading>
        <I18n k="nfiShop.title" />
      </Heading>
      <Grid>
        {Object.keys(normalisedAndLocalisedProductTypeTuples)
          .map(
            (productTypeKey) => normalisedAndLocalisedProductTypeTuples[productTypeKey]
          )
          .map((productType) => (
              <Button
              key={productType.normalised}
                onClick={() =>
                  // alert(`SHOW PRODUCT DETAILS FOR ${productType.normalised}`)
                  setProductTypeForDetailView(productType.normalised)
                }
              >
                {productType.localised}
              </Button>
          ))}
      </Grid>
      <Button
        onClick={() =>
          onSubmitFormView({
            [`nfiShopForm_${formViewId}_.shoppingData`]: "SOME SHOPPING DATA",
          })
        }
      >
        <I18n k="nfiShop.done" />
      </Button>
    </Stack>
  );
};

export default NFIShop;
