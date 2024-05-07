"use client";

import styles from "./CompaniesHeadingAndButton.module.css"
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";

export default function CompaniesHeadingAndButton({setOpenModal, setModalTitle, setModalContent}){

    return (
        <TableTitleAndButton 
            tableTitle = {"Companies"}
            includeButton = {true}
            buttonTitle = {"Create Company"}
            buttonClickHandler = {
                () => {
                    setOpenModal(true); 
                    setModalTitle("Create Company");
                    setModalContent(<h1>Create Company Form</h1>);
                }
            }
        />
    );
    
}
