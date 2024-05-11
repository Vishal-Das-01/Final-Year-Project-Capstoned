"use client";

import styles from "./CompaniesHeadingAndButton.module.css"
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";
import CreateCompanyForm from "../CreateCompanyForm/CreateCompanyForm";

export default function CompaniesHeadingAndButton({setOpenModal, setModalTitle, setModalContent}){

    return (
        <TableTitleAndButton 
            tableTitle = {"Mentors"}
            includeButton = {false}
            buttonTitle = {"Create Company"}
            buttonClickHandler = {
                () => {
                    setOpenModal(true); 
                    setModalTitle("Create Company");
                    setModalContent(<CreateCompanyForm setOpenModal={setOpenModal}/>);
                }
            }
        />
    );
    
}
