import React, { useState } from "react";
import { GlobalContext } from "../../../GlobaContext";
import I18n from "../../../lib/I18n";
import ProductDetailView from "./ProductDetailView";
import { getLocalizedContentForCurrentLanguageOrForEnglish } from "../../../lib/I18n";
import { Button, Center, Grid, Heading, Stack } from "@chakra-ui/react";
import { FormViewSubmitComponentProps } from "../../../Types";
import { StockDataItem } from "../../../../../lib/graphqlClientTypes";

// interface NormalisedAndLocalisedProductTypeTuple {
//   normalised: string;
//   localised: string;
// }

const NFIShop = ({
  onSubmitFormView,
  formViewId,
  stockData,
}: FormViewSubmitComponentProps & { stockData: StockDataItem[] }) => {
  const { currentLanguage } = React.useContext(GlobalContext);
  const [productTypeForDetailView, setProductTypeForDetailView] =
    useState<string>();

  const getProductsByProductCategoryName = (productType: string) => {
    return stockData.flatMap(stockDataItem => stockDataItem.product).filter((product) => product.category.name === productType);
  };

  // const normalisedAndLocalisedProductTypeTuples = stockData.reduce<{
  //   [key: string]: NormalisedAndLocalisedProductTypeTuple;
  // }>((acc, product) => {
  //   const localizedProductDetails =
  //     getLocalizedProductDetailsForCurrentLanguageOrForEnglish(
  //       product,
  //       currentLanguage.id
  //     );
  //   return {
  //     ...acc,
  //     [product.productType]: {
  //       normalised: product.productType,
  //       localised: localizedProductDetails.productType,
  //     },
  //   };
  // }, {});

  const productCategoryNames = stockData.reduce<string[]>((acc, stockDataItem) => {
    return [...acc, stockDataItem.product.category.name];
  }, []);

  return (
    <Stack>
      {productTypeForDetailView && (
        <ProductDetailView
          // isOpen={productTypeForDetailView != null}
          onClose={() => setProductTypeForDetailView(undefined)}
          // productType={productTypeForDetailView}
          productsForType={getProductsByProductCategoryName(productTypeForDetailView)}
          // onAddToCart={}
        />
      )}
      <Heading>
        <I18n k="nfiShop.title" />
      </Heading>
      <Grid>
        {productCategoryNames.map((productCategoryName) => (
            <Button
              key={productCategoryName}
              onClick={() =>
                // alert(`SHOW PRODUCT DETAILS FOR ${productType.normalised}`)
                setProductTypeForDetailView(productCategoryName)
              }
            >
              {productCategoryName}
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
