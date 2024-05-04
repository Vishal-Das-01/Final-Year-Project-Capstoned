"use client";

import styles from "./AccountHeadingAndButton.module.css";
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";

export default function AccountHeadingAndButton(){

    function createAccountHandler(){
        console.log("Create Account");
    }

    return (
        <TableTitleAndButton 
            tableTitle = {"Accounts"}
            includeButton = {true}
            buttonTitle = {"Create Account"}
            buttonClickHandler = {createAccountHandler}
        />
    );
    
}