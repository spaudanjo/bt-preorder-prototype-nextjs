export type Maybe<T> = T | null;
export type InputMaybe<T> = Maybe<T>;
export type Exact<T extends { [key: string]: unknown }> = { [K in keyof T]: T[K] };
export type MakeOptional<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]?: Maybe<T[SubKey]> };
export type MakeMaybe<T, K extends keyof T> = Omit<T, K> & { [SubKey in K]: Maybe<T[SubKey]> };
/** All built-in and custom scalars, mapped to their actual values */
export type Scalars = {
  ID: string;
  String: string;
  Boolean: boolean;
  Int: number;
  Float: number;
};

export type InfoMessageForm = OrderFormItem & {
  __typename?: 'InfoMessageForm';
  id: Scalars['String'];
  infoMessage: Scalars['String'];
  itemSequence: Scalars['Int'];
  orderFormViewType: OrderFormViewType;
};

export type OrderForm = {
  __typename?: 'OrderForm';
  id: Scalars['String'];
  orderFormItems: Array<OrderFormItem>;
  slug: Scalars['String'];
  status: OrderFormStatus;
  title: Scalars['String'];
};

export type OrderFormItem = {
  id: Scalars['String'];
  itemSequence: Scalars['Int'];
  orderFormViewType: OrderFormViewType;
};

export enum OrderFormStatus {
  Active = 'ACTIVE',
  Draft = 'DRAFT',
  Inactive = 'INACTIVE'
}

export enum OrderFormViewType {
  InfoMessage = 'INFO_MESSAGE',
  OrderConfirmation = 'ORDER_CONFIRMATION',
  ShoppingForm = 'SHOPPING_FORM'
}

export type Product = {
  __typename?: 'Product';
  id: Scalars['String'];
  name: Scalars['String'];
};

export type Query = {
  __typename?: 'Query';
  orderForm?: Maybe<OrderForm>;
  orderForms: Array<OrderForm>;
  products: Array<Product>;
  stockDataItems: Array<StockDataItem>;
};


export type QueryOrderFormArgs = {
  id?: InputMaybe<Scalars['String']>;
};

export type ShoppingForm = OrderFormItem & {
  __typename?: 'ShoppingForm';
  id: Scalars['String'];
  itemSequence: Scalars['Int'];
  orderFormViewType: OrderFormViewType;
  shoppingInfo?: Maybe<Scalars['String']>;
  stockData: Array<StockDataItem>;
};

export type StockDataItem = {
  __typename?: 'StockDataItem';
  availableItems: Scalars['Int'];
  id: Scalars['String'];
  product: Product;
  size: Scalars['String'];
};

export type ProductsQueryVariables = Exact<{ [key: string]: never; }>;


export type ProductsQuery = { __typename?: 'Query', products: Array<{ __typename?: 'Product', id: string, name: string }> };

export type OrderFormQueryVariables = Exact<{
  formId: Scalars['String'];
}>;


export type OrderFormQuery = { __typename?: 'Query', orderForm?: { __typename?: 'OrderForm', id: string, slug: string, status: OrderFormStatus, orderFormItems: Array<{ __typename: 'InfoMessageForm', infoMessage: string, id: string } | { __typename: 'ShoppingForm', shoppingInfo?: string | null, id: string, stockData: Array<{ __typename?: 'StockDataItem', size: string, availableItems: number, product: { __typename?: 'Product', name: string } }> }> } | null };
