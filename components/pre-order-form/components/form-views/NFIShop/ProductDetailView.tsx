import {
  Accordion,
  AccordionItem,
  AccordionButton,
  Box,
  AccordionIcon,
  AccordionPanel,
  Button,
  Modal,
  ModalBody,
  ModalContent,
  ModalFooter,
  ModalHeader,
  ModalOverlay,
} from "@chakra-ui/react";
import React from "react";
import { Product } from "../../../../../lib/graphqlClientTypes";
import { GlobalContext } from "../../../GlobaContext";
import I18n from "../../../lib/I18n";

interface ProductDetaiViewProps {
  productsForType: Product[];
  onClose: () => void;
}
const ProductDetailView = ({
  onClose,
  productsForType,
}:
ProductDetaiViewProps) => {
  const { currentLanguage } = React.useContext(GlobalContext);

  // const localizedProductType =
  //   getLocalizedProductDetailsForCurrentLanguageOrForEnglish(
  //     productsForType[0],
  //     currentLanguage.id
  //   ).productType;


  const productsForTypeGroupedByGender = productsForType.reduce(
    (acc, product) => ({
      ...acc,
      [product.gender]: [...(acc[product.gender] || []), product],
    }),
    {} as { [key: string]: Array<Product> }
  );
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{productsForType[0].name}</ModalHeader>
        {/* <ModalCloseButton /> */}
        <ModalBody>
          <Accordion defaultIndex={0} allowMultiple>
            {Object.keys(productsForTypeGroupedByGender).map((genderId) => {
              const productsForTypeAndGender =
                productsForTypeGroupedByGender[genderId];
              return (
                <AccordionItem key={genderId}>
                  <h2>
                    <AccordionButton>
                      <Box flex="1" textAlign="left">
                        <I18n k={`basics.${genderId}`} />
                      </Box>
                      <AccordionIcon />
                    </AccordionButton>
                  </h2>
                  <AccordionPanel pb={4}>
                    {productsForTypeAndGender.map((product, i) => {
                      return <p key={i}> {product.gender} </p>;
                    })}
                  </AccordionPanel>
                </AccordionItem>
              );
            })}
          </Accordion>
        </ModalBody>

        <ModalFooter>
          <Button colorScheme="blue" mr={3} onClick={onClose}>
            Close
          </Button>
        </ModalFooter>
      </ModalContent>
    </Modal>
  );
};

export default ProductDetailView;
