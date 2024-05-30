"use client";

import styles from "./ModalDataActionButton.module.css";

export default function ModalDataActionButton({buttonText, buttonClickAction, dataID, isUpdate, isDelete}){
    
    function btnStyling(){
        if(isDelete)
            return `bg-red-500 border-2 border-red-500 hover:bg-white hover:border-2 hover:border-red-500 hover:text-red-500`;
        if(!isUpdate)
            return `bg-blue-500 border-2 border-blue-500 hover:bg-white hover:border-2 hover:border-blue-500 hover:text-blue-500`;
        return `bg-black border-2 border-black hover:bg-white hover:border-2 hover:border-black hover:text-black`
    }

    return (
        <div className={`${styles.modalActionBtnPrimaryContainer} flex flex-row items-center justify-center `}>
            
            <button 
                className={`${styles.modalActionBtn} ${btnStyling()} text-white mr-2 font-montserrat`}
                onClick={buttonClickAction}
            >
                {buttonText}
            </button>

        </div>
    );
}