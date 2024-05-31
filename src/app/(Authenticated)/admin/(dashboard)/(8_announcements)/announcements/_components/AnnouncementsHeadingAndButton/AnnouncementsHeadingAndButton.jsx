"use client";

import styles from "./AnnouncementsHeadingAndButton.module.css";
import TableTitleAndButton from "../../../../_components/TableTitleAndButton/TableTitleAndButton";
import CreateAnnouncementForm from "../CreateAnnouncementForm/CreateAnnouncementForm";

export default function AnnouncementsHeadingAndButton({setOpenModal, setModalTitle, setModalContent, setDataChanged}){

    return (
        <TableTitleAndButton 
            tableTitle = {"Announcements"}
            includeButton = {true}
            buttonTitle = {"Create Announcement"}
            buttonClickHandler = {
                () => {
                    setOpenModal(true); 
                    setModalTitle("Create Announcement");
                    setModalContent(<CreateAnnouncementForm setOpenModal={setOpenModal} setDataChanged={setDataChanged}/>);
                }
            }
        />
    );
    
}
