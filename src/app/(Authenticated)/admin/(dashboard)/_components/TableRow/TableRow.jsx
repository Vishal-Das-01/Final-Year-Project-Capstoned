"use client";

import styles from "./TableRow.module.css";

export default function TableRow({children, setOpenModal, setModalContent, setModalTitle, content}){
    return (
        <tr 
            className="border-b dark:border-gray-700 hover:bg-gray-100 cursor-pointer"  
            onClick={
                () => {
                    setOpenModal(true); 
                    setModalContent(content)
                    setModalTitle()
                }
            }
        >
                     
            {children}
            
        </tr>
    );
}