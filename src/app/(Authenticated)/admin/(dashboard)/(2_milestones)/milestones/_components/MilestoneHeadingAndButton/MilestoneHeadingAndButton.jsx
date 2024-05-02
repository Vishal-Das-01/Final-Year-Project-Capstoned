"use client";

import styles from "./MilestoneHeadingAndButton.module.css";
import TableHeading from "../../../../_components/TableHeading/TableHeading";
import TableActionButton from "../../../../_components/TableActionButton/TableActionButton";

export default function MilestoneHeadingAndButton(props){
    function createMilestoneHandler(){
		console.log("Create Milestone");
	}

    return (
        <div className={`${styles.headingAndButtonContainer} flex flex-row items-center justify-between `}>
					
            <TableHeading>
                Milestones
            </TableHeading>

            <TableActionButton onClickAction={createMilestoneHandler}>
                Create Milestone
            </TableActionButton>

        </div>
    );
}