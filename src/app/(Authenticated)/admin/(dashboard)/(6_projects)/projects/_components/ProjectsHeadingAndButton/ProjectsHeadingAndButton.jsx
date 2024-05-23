"use client";

import styles from "./ProjectsHeadingAndButton.module.css";
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";

export default function ProjectsHeadingAndButton({onClick, buttonApiLoading}){

    return (
        <TableTitleAndButton 
            tableTitle = {"Projects"}
            includeButton = {false}
            buttonTitle = {"Finalize All Projects"}
            buttonClickHandler = {null}
            buttonApiLoading={false}
            apiLoadingButtonWidth={"0px"}
        />
    );
    
}
