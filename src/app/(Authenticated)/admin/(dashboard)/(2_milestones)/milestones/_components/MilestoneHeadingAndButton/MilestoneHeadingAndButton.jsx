"use client";

import styles from "./MilestoneHeadingAndButton.module.css";
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";
import CreateMilestoneForm from "../CreateMilestoneForm/CreateMilestoneForm";

export default function MilestoneHeadingAndButton({setOpenModal, setModalTitle, setModalContent, setDataChanged}){

    return (
        <TableTitleAndButton 
            tableTitle = {"Milestones"}
            includeButton = {true}
            buttonTitle = {"Create Milestone"}
            buttonClickHandler = {
                () => {
                    setOpenModal(true); 
                    setModalTitle("Create Milestsone");
                    setModalContent(<CreateMilestoneForm setOpenModal={setOpenModal} setDataChanged={setDataChanged}/>);
                }
            }
            buttonApiLoading={false}
            apiLoadingButtonWidth={"0px"}
        />
    );
}