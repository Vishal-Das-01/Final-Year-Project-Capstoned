"use client";

import styles from "./CreateMilestoneForm.module.css";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormRow from "../../../../_components/FormRow/FormRow";   
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton"; 
import FormDateInput from "../../../../_components/FormDateInput/FormDateInput";
import FormNumberInput from "../../../../_components/FormNumberInput/FormNumberInput";
import FormTextArea from "../../../../_components/FormTextArea/FormTextArea";

export default function CreateMilestoneForm({setOpenModal}){
    let formId = `createMilestoneForm`;

    function submitForm(){
        console.log("Submit Form");
    }

    return (
        <div className={`${styles.createMilestoneFormPrimaryContainer} w-full `}>

            <form id={formId} className={`${styles.createMilestoneForm} flex flex-col items-center justify-start`}>
                
                <FormRow 
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >
                    
                    <FormNumberInput 
                        labelText="Assignment Number"
                        numberInputName="milestoneAssignmentNumber"
                        placeholderText="Assignment Number"
                        isRequired={true}
                    />

                    <FormTextInput 
                        labelText={"Title"} 
                        textInputName={"milestoneTitle"} 
                        placeholderText={"Milestone Title"}
                        isRequired={true}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormDateInput
                        labelText="Deadline"
                        emailInputName="milestoneDeadline"
                        placeholderText="Milestone Deadline"
                        isRequired={true}
                    />

                    <FormNumberInput 
                        labelText="Milestone Worth"
                        numberInputName="milestonePercentageWorth"
                        placeholderText="Percentage"
                        isRequired={true}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormNumberInput 
                        labelText="Milestone Year"
                        numberInputName="milestoneYear"
                        placeholderText="Year"
                        isRequired={true}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-start"} 
                    horizontalPlacement={"items-start"}
                >

                    <FormTextArea
                        labelText="Description"
                        textAreaName="milestoneDescription"
                        placeholderText="Milestone Description"
                        isRequired={true}
                    />

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