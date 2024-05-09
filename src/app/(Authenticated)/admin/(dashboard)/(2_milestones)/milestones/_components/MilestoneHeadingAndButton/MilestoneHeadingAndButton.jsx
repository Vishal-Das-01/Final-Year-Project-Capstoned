"use client";

import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";
import CreateMilestoneForm from "../CreateMilestoneForm/CreateMilestoneForm";

export default function MilestoneHeadingAndButton({setOpenModal, setModalTitle, setModalContent}){

    return (
        <TableTitleAndButton 
            tableTitle = {"Milestones"}
            includeButton = {true}
            buttonTitle = {"Create Milestone"}
            buttonClickHandler = {
                () => {
                    setOpenModal(true); 
                    setModalTitle("Create Milestsone");
                    setModalContent(<CreateMilestoneForm setOpenModal={setOpenModal}/>);
                }
            }
        />
    );
}