"use client";

import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";

export default function MilestoneHeadingAndButton(props){
    function createMilestoneHandler(){
		console.log("Create Milestone");
	}

    return (
        <TableTitleAndButton 
            tableTitle = {"Milestones"}
            includeButton = {true}
            buttonTitle = {"Create Milestone"}
            buttonClickHandler = {createMilestoneHandler}
        />
    );
}