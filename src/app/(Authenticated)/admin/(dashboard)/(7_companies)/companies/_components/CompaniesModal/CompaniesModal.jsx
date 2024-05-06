"use client";

import styles from "./CompaniesModal.module.css";
import Modal from "../../../../_components/Modal/Modal";
import { useState } from "react";

export default function CompaniesModal({modalContent}){
    const [openModal, setOpenModal] = useState(false);

    return (
        openModal 
        && 
        <Modal 
            modalHeadingText="Remove"
            closeModal = {setOpenModal(true)}
        >

            {modalContent}
            
        </Modal>
        
    );
}