"use client";

import styles from "./CreateCompanyForm.module.css";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormRow from "../../../../_components/FormRow/FormRow";
import FormEmailInput from "../../../../_components/FormEmailInput/FormEmailInput";
import FormNumberInput from "../../../../_components/FormNumberInput/FormNumberInput";
import FormToggleButton from "../../../../_components/FormToggleButton/FormToggleButton";

export default function CreateCompanyForm(){
    return (
        <div className={`${styles.createCompanyFormPrimaryContainer} w-full `}>

            <form className={`${styles.createCompanyForm} flex flex-col items-center justify-start`}>
                
                <FormRow>

                    <FormTextInput 
                        labelText={"Name"} 
                        textInputName={"companyName"} 
                        placeholderText={"Company Name"}
                        isRequired={true}
                    />

                    <FormNumberInput
                        labelText="Number"
                        emailInputName="companyNumber"
                        placeholderText="Company Number"
                        isRequired={true}
                    />

                </FormRow>

                <FormRow>

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

                <FormRow>

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

                <FormRow>

                    <FormTextInput 
                        labelText={"City"} 
                        textInputName={"companyCity"} 
                        placeholderText={"City"}
                        isRequired={false}
                    />

                    <FormNumberInput
                        labelText="Profile Image"
                        emailInputName="companyProfileImage"
                        placeholderText="Company Profile Image"
                        isRequired={false}
                    />

                </FormRow>

            </form>

        </div>
    );
}