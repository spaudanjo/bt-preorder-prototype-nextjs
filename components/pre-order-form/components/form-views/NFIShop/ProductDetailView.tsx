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
import { StockDataItem } from "../../../../../lib/graphqlClientTypes";
import { GlobalContext } from "../../../GlobaContext";
import I18n from "../../../lib/I18n";

interface ProductDetaiViewProps {
  stockDataForProductCategoryName: StockDataItem[];
  onClose: () => void;
}
const ProductDetailView = ({
  onClose,
  stockDataForProductCategoryName,
}:
ProductDetaiViewProps) => {
  const { currentLanguage } = React.useContext(GlobalContext);

  // const localizedProductType =
  //   getLocalizedProductDetailsForCurrentLanguageOrForEnglish(
  //     productsForType[0],
  //     currentLanguage.id
  //   ).productType;


  const productsForTypeGroupedByGender = stockDataForProductCategoryName.reduce(
    (acc, stockDataItem) => ({
      ...acc,
      [stockDataItem.product.gender]: [...(acc[stockDataItem.product.gender] || []), stockDataItem],
    }),
    {} as { [key: string]: Array<StockDataItem> }
  );
  return (
    <Modal isOpen={true} onClose={onClose}>
      <ModalOverlay />
      <ModalContent>
        <ModalHeader>{stockDataForProductCategoryName[0].product.category.name}</ModalHeader>
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
                    {productsForTypeAndGender.map((stockDataItem, i) => {
                      return <p key={i}> {stockDataItem.product.gender} </p>;
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
