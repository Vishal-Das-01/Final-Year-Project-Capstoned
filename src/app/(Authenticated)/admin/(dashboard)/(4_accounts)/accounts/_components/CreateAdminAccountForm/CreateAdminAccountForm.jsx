"use client";

import styles from "./CreateAdminAccountForm.module.css";
import FormRow from "../../../../_components/FormRow/FormRow";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormDropDownSelect from "../../../../_components/FormDropDownSelect/FormDropDownSelect";
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";
import FormEmailInput from "../../../../_components/FormEmailInput/FormEmailInput";

export default function CreateAdminAccountForm({setOpenModal}){
    let formId = `createAdminAccountForm`;

    function submitForm(){
        console.log("Submit Form");
    }

    return (
        <div className={`${styles.createAdminAccountFormPrimaryContainer} w-full `}>

            <form id={formId} className={`${styles.createAdminAccountForm} flex flex-col items-center justify-start`}>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                    rowHeight={""}
                >

                    <FormTextInput 
                        labelText="First Name"
                        textInputName="adminFirstName"
                        placeholderText="First Name"
                        isRequired={true}
                    />

                    <FormTextInput 
                        labelText="Last Name"
                        textInputName="adminLastName"
                        placeholderText="Last Name"
                        isRequired={true}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                    rowHeight={""}
                >

                    <FormDropDownSelect 
                        labelText="Gender"
                        dropDownSelectName={`adminGender`}
                        options={["Male", "Female"]}
                        isRequired={true}
                        placeholder={"Admin's Gender"}
                    />

                    <FormEmailInput 
                        labelText="Email" 
                        emailInputName={"adminEmailID"} 
                        placeholderText="Admin's Email ID" 
                        isRequired={true}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-end"}
                    horizontalPlacement={"items-end"}
                    rowHeight={"h-56"}
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