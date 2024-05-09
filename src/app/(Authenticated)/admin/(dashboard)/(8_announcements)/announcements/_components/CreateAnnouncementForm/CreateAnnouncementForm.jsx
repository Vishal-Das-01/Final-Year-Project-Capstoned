"use client";

import styles from "./CreateAnnouncementForm.module.css"; 
import FormRow from "../../../../_components/FormRow/FormRow";    
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";  
import FormTextArea from "../../../../_components/FormTextArea/FormTextArea";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormToggleButton from "../../../../_components/FormToggleButton/FormToggleButton";

export default function CreateAnnouncementForm({setOpenModal}){
    let formId = `createAnnouncementForm`;

    function submitForm(){
        console.log("Submit Form");
    }

    return (
        <div className={`${styles.createAnnouncementFormPrimaryContainer} w-full `}>

            <form id={formId} className={`${styles.createAnnouncementForm} flex flex-col items-center justify-start`}>
                
                <FormRow 
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >
                    
asasas

                </FormRow>
            
                <FormRow
                    verticalPlacement={"justify-end"}
                    horizontalPlacement={"items-center"}
                >
                    <FormActionButton 
                        buttonText={`Save`}
                        buttonClickAction={submitForm}
                        formId={formId}
                        isCancel={false}
                    />

                    <FormActionButton 
                        buttonText={`Cancel`}
                        buttonClickAction={() => setOpenModal(false)}
                        formId={null}
                        isCancel={true}
                    />

                </FormRow>

            </form>

        </div>
    );
}