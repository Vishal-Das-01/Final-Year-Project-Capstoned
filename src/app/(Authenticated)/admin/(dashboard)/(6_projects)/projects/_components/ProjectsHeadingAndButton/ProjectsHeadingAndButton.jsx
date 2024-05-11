"use client";

import styles from "./ProjectsHeadingAndButton.module.css";
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";

export default function ProjectsHeadingAndButton(){

    function finalizeAllProjectsHandler(){
        console.log("Finalize All Projects");
    }

    return (
        <TableTitleAndButton 
            tableTitle = {"Projects"}
            includeButton = {true}
            buttonTitle = {"Finalize All Projects"}
            buttonClickHandler = {finalizeAllProjectsHandler}
        />
    );
    
}
