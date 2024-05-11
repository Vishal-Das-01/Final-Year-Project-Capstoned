"use client";

import styles from "./CreateCompanyForm.module.css";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormRow from "../../../../_components/FormRow/FormRow";
import FormEmailInput from "../../../../_components/FormEmailInput/FormEmailInput";
import FormNumberTextInput from "../../../../_components/FormNumberTextInput/FormNumberTextInput";
import FormToggleButton from "../../../../_components/FormToggleButton/FormToggleButton";
import FormFileInput from "../../../../_components/FormFileInput/FormFileInput";
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";

export default function CreateCompanyForm({setOpenModal}){
    let formId = `createCompanyForm`;

    function submitForm(){
        console.log("Submit Form");
    }

    return (
        <div className={`${styles.createCompanyFormPrimaryContainer} w-full `}>

            <form id={formId} className={`${styles.createCompanyForm} flex flex-col items-center justify-start`}>
                
                <FormRow 
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormTextInput 
                        labelText={"Name"} 
                        textInputName={"companyName"} 
                        placeholderText={"Company Name"}
                        isRequired={true}
                    />

                    <FormNumberTextInput
                        labelText="Number"
                        emailTextInputName="companyNumber"
                        placeholderText="Company Contact Number"
                        isRequired={true}
                    />

                </FormRow>

                <FormRow 
                    verticalPlacement={"justify-between"}
                    horizontalPlacement={"items-center"}
                >

                    <FormEmailInput
                        labelText="Email"
                        emailInputName="companyEmail"
                        placeholderText="Company Email"
                        isRequired={true}
                    />

                    <FormTextInput 
                        labelText={"Address"} 
                        textInputName={"companyAddress"} 
                        placeholderText={"Company Address"}
                        isRequired={false}
                    />

                </FormRow>

                <FormRow 
                    verticalPlacement={"justify-between"}
                    horizontalPlacement={"items-center"}
                >

                    <FormTextInput 
                        labelText={"Website URL"} 
                        textInputName={"companyWebsite"} 
                        placeholderText={"Company Website"}
                        isRequired={false}
                    />

                    <FormTextInput 
                        labelText={"Linkedin URL"} 
                        textInputName={"companyLinkedin"} 
                        placeholderText={"Company Linkedin"}
                        isRequired={false}
                    />

                </FormRow>

                <FormRow 
                    verticalPlacement={"justify-between"}
                    horizontalPlacement={"items-end"}
                >

                    <FormTextInput 
                        labelText={"City"} 
                        textInputName={"companyCity"} 
                        placeholderText={"City"}
                        isRequired={false}
                    />

                    <FormToggleButton 
                        inactiveLabelText="No"
                        activeLabelText="Yes"
                        isRequired={false}
                        labelText="Verified"
                        toggleInputName="verified"
                    />

                </FormRow>

                <FormRow 
                    verticalPlacement={"justify-between"}
                    horizontalPlacement={"items-center"}
                >

                    <FormFileInput
                        labelText="Profile Image"
                        fileInputName="companyProfileImage"
                        isRequired={true}
                        acceptableFiles=".jpeg, .jpg, .png"
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