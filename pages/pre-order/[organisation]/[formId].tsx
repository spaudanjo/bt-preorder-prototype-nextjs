import { NextPage } from "next";
import { useRouter } from "next/router";
import { gql, useQuery } from "@apollo/client";
import PreOrderForm from "../../../components/pre-order-form/PreOrderForm";
import { OrderFormQuery, OrderFormQueryVariables } from "../../../lib/graphqlClientTypes";

const FORM_QUERY = gql`
  query OrderForm($formId: String!) {
    orderForm(id: $formId) {
      id
      slug
      status
      orderFormItems {
        __typename
        orderFormViewType
        id
        ... on InfoMessageForm {
          # infoMessageFormInfoMessage
          infoMessage
        }
        ... on ShoppingForm {
          shoppingInfo
          stockData {
            id
            size
            availableItems
            product {
              id
              name
              gender
            }
          }
        }
      }
    }
  }
`;

const PreOrder: NextPage = () => {
  const router = useRouter();
  const { organisation, formId } = router.query;

  const { data, loading, error } = useQuery<OrderFormQuery, OrderFormQueryVariables>(FORM_QUERY, {
    variables: { formId: formId as string },
  });

  if (loading) return <p>Loading...</p>;
  if (error) return <p>Oh no... {error.message}</p>;
  if (data?.orderForm?.orderFormItems == null) return <p>Oh no...</p>;

  return (
    <div>
      <p>Pre-Order form with id {formId} for organisation {organisation}</p>
      <PreOrderForm orderFormItems={data?.orderForm?.orderFormItems} />
    </div>
  );
};

export default PreOrder;
