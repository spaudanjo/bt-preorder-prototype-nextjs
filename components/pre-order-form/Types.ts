export type FlattenedFormViewResult = {
  [key: string]: string | number | boolean;
};
export interface FormViewSubmitComponentProps {
  onSubmitFormView: (formViewData: FlattenedFormViewResult) => void;
  formViewId: string;
}
// export type GenericFormViewComponent = (props: FormViewSubmitComponentProps) => JSX.Element
// export type NFIViewComponent = (props: FormViewSubmitComponentProps & { stockData: string }) => JSX.Element

// export interface GenericFormViewMappingEntry {
//   id: "medical-help";
//   component: GenericFormViewComponent
// }

// export interface NFIShopViewMappingEntry extends GenericFormViewComponent {
//   id: "nfi-shop",
//   component: NFIViewComponent
// }

// export type FormViewMappingEntry = GenericFormViewMappingEntry | NFIShopViewMappingEntry

export interface LanguageDictionary {
  [key: string]: string;
}

export interface Language {
  name: string;
  id: string;
  dictionary: LanguageDictionary;
}

// export interface LocalizedProductDetails {
//   productType: string;
//   size: string;
//   gender: string;
// }
// export interface Product {
//   id: string;
//   name: string;
//   category: {
//     name: string;
//   };
//   gender: string;
//   // localizedProductDetailsByLanguageId: {
//   //   [key: string]: LocalizedProductDetails;
//   // };
// }

// export interface StockDataItem {
//   product: Product;
//   availableItems: number;
//   size: string;
// }

export interface FormDataWithLocalizedContent {
  localizedContent: {
    [key: string]: {
      title: string;
      description: string;
    };
  };
}

export interface InfoMessageFormData extends FormDataWithLocalizedContent {
  id: string;
  type: "info-message";
}

export interface TextInputFormData extends FormDataWithLocalizedContent {
  id: string;
  type: "text-input";
}

// export type FormStructureAPIDataEntry =
//   | {
//       id: string;
//       type: "medical-help" | "language-chooser";
//     }
//   | InfoMessageFormData
//   | TextInputFormData
//   | {
//       id: string;
//       type: "nfi-shop";
//       stockData: Array<StockDataItem>;
//     };

export interface ProductOrder {
  productType: string;
  // si
}

export interface LanguageMap {
  en: Language;
  [key: string]: Language;
}
