"use client";

import styles from "./CreateStudentAccountForm.module.css";
import FormRow from "../../../../_components/FormRow/FormRow";

export default function CreateStudentAccountForm({setOpenModal}){
    let formId = `createStudentAccountForm`;

    function submitForm(){
        console.log("Submit Form");
    }

    return (
        <div className={`${styles.createStudentAccountFormPrimaryContainer} w-full `}>

            <form id={formId} className={`${styles.createStudentAccountForm} flex flex-col items-center justify-start`}>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

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