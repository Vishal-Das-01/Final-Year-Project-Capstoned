"use client";

import styles from "./AnnouncementsHeadingAndButton.module.css";
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";

export default function AnnouncementsHeadingAndButton({setOpenModal, setModalTitle, setModalContent}){

    function createAnnouncementHandler(){
        console.log("Create Announcement");
    }

    return (
        <TableTitleAndButton 
            tableTitle = {"Announcements"}
            includeButton = {true}
            buttonTitle = {"Create Announcement"}
            buttonClickHandler = {
                () => {
                    setOpenModal(true); 
                    setModalTitle("Create Announcement");
                    setModalContent(<h1>Create Announcement Form</h1>);
                }
            }
        />
    );
    
}
