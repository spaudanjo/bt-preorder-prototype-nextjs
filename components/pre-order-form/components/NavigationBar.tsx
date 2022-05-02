import { Center, Button } from "@chakra-ui/react";
import React from "react"; 
import I18n from "../lib/I18n";


interface NavigationBarProps {
    onClickBack: () => void;
    canGoBack: boolean;
}

const NavigationBar = ({onClickBack, canGoBack}: NavigationBarProps) => {
    return (
        <Center>
            <Button disabled={!canGoBack} onClick={onClickBack}><I18n k="navigationBar.back" /></Button>
        </Center>
    )
};

export default NavigationBar;