"use client";

import styles from "./FYPGroupsHeadingAndButton.module.css";
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";

export default function FYPGroupsHeadingAndButton(props){
    function finalizeAllGroups(){
		console.log("Finalize All Groups");
	}

    return (
        <TableTitleAndButton 
            tableTitle = {"FYP Groups"}
            includeButton = {true}
            buttonTitle = {"Finalize All Groups"}
            buttonClickHandler = {finalizeAllGroups}
        />
    );
}
