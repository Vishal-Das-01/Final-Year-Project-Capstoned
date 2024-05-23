"use client";

import styles from "./FYPGroupsHeadingAndButton.module.css";
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";

export default function FYPGroupsHeadingAndButton({onClick, buttonApiLoading}){

    return (
        <TableTitleAndButton 
            tableTitle = {"FYP Groups"}
            includeButton = {true}
            buttonTitle = {"Finalize All Groups"}
            buttonClickHandler = {onClick}
            buttonApiLoading={buttonApiLoading}
            apiLoadingButtonWidth={"201px"}
        />
    );
}
