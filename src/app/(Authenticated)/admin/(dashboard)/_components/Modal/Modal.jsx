import styles from "./Modal.module.css";
import { IoMdClose } from "react-icons/io";
import ContentHeadingLine from "../ContentHeadingLine/ContentHeadingLine";

export default function Modal({children, modalHeadingText, closeModal}){

    return (
        <div 
            className={`${styles.modalPrimaryContainer} backdrop-blur-md flex h-screen bg-gray-500 bg-opacity-50 items-center justify-center overflow-x-hidden fixed z-50 w-full md:inset-0 max-h-full `}
            data-modal-backdrop="static"
            tabindex="-1"
            aria-hidden="true"
        >

            <div className={`${styles.modalContentPrimaryContainer} z-10 rounded-lg`}>
            
                <div className={`${styles.modalHeaderContainer} w-full flex flex-row items-center justify-between `}>
                    
                    <div className={`${styles.modalHeadingContainer} flex flex-row items-center`}>
                        
                        <h1 className={`${styles.modalHeading} font-montserrat font-semibold text-ellipsis overflow-hidden whitespace-nowrap`}>
                            {modalHeadingText}
                        </h1>

                        <ContentHeadingLine />

                    </div>

                    <div className={`${styles.modalCloseBtnContainer} cursor-pointer `}>
                        
                        <button 
                            className={`${styles.modalCloseBtn} cursor-pointer flex flex-row items-center justify-center`}
                            onClick={closeModal}
                        >
                            <IoMdClose style={{ fontSize: "20px" }}/>
                        </button>
                    
                    </div>
                
                </div>

                <div className={`${styles.modalSecondaryContentContainer} overflow-y-auto `}>
                    
                    <div className={`${styles.modalTertiaryContentContainer} w-full pr-2 text-justify`}>
                        {children}
                    </div>
                
                </div>
          
            </div>

            <div className={`${styles.modalBackdrop}`} onClick={closeModal}/>

        </div>
    );
}
