"use client";

import styles from "./AccountHeadingAndButton.module.css";
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";
import CreateAdminAccountForm from "../CreateAdminAccountForm/CreateAdminAccountForm";

export default function AccountHeadingAndButton({setOpenModal, setModalTitle, setModalContent}){

    function createAccountHandler(){
        console.log("Create Account");
    }

    return (
        <TableTitleAndButton 
            tableTitle = {"Accounts"}
            includeButton = {true}
            buttonTitle = {"Create Account"}
            buttonClickHandler = {
                () => {
                    setOpenModal(true); 
                    setModalTitle("Create Account");
                    setModalContent(<CreateAdminAccountForm setOpenModal={setOpenModal}/>);
                }
            }
        />
    );
    
}