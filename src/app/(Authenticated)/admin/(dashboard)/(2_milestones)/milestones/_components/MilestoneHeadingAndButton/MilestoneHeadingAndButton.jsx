"use client";

import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";

export default function MilestoneHeadingAndButton({setOpenModal, setModalTitle, setModalContent}){
    function createMilestoneHandler(){
		console.log("Create Milestone");
	}

    return (
        <TableTitleAndButton 
            tableTitle = {"Milestones"}
            includeButton = {true}
            buttonTitle = {"Create Milestone"}
            buttonClickHandler = {
                () => {
                    setOpenModal(true); 
                    setModalTitle("Create Milestsone");
                    setModalContent(<h1>Create Milestone Form</h1>);
                }
            }
        />
    );
}