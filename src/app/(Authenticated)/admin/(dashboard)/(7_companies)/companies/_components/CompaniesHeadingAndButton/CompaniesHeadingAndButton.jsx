"use client";

import styles from "./CompaniesHeadingAndButton.module.css"
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";
import CreateCompanyForm from "../CreateCompanyForm/CreateCompanyForm";

export default function CompaniesHeadingAndButton({setOpenModal, setModalTitle, setModalContent, setDataChanged}){

    return (
        <TableTitleAndButton 
            tableTitle = {"Companies"}
            includeButton = {true}
            buttonTitle = {"Create Company"}
            buttonClickHandler = {
                () => {
                    setOpenModal(true); 
                    setModalTitle("Create Company");
                    setModalContent(<CreateCompanyForm setOpenModal={setOpenModal} setDataChanged={setDataChanged}/>);
                }
            }
        />
    );
    
}
