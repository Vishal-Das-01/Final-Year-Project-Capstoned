"use client";

import styles from "./CompaniesHeadingAndButton.module.css"
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";

export default function CompaniesHeadingAndButton(){

    function createCompanyHandler(){
        console.log("Create Company");
    }

    return (
        <TableTitleAndButton 
            tableTitle = {"Companies"}
            includeButton = {true}
            buttonTitle = {"Create Company"}
            buttonClickHandler = {createCompanyHandler}
        />
    );
    
}
