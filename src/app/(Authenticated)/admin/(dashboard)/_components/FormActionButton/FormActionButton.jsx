"use client";

import styles from "./FormActionButton.module.css";

export default function FormActionButton({buttonText, buttonClickAction, formId, isCancel}){
    function btnStyling(){
        if(!isCancel)
            return `bg-blue-500 border-2 border-blue-500 hover:bg-white hover:border-2 hover:border-blue-500 hover:text-blue-500`;
        return `bg-black border-2 border-black hover:bg-white hover:border-2 hover:border-black hover:text-black`
    }

    return (
        <div className={`${styles.formActionBtnPrimaryContainer} flex flex-row items-center justify-center `}>
            
            <button 
                className={`${styles.formActionBtn} ${btnStyling()} text-white mr-2 `}
                onClick={buttonClickAction}
                form={formId}
            >
                {buttonText}
            </button>

        </div>
    );
}