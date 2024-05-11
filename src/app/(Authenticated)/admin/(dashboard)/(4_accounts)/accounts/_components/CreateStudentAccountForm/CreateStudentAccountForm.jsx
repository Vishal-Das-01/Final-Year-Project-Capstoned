"use client";

import styles from "./CreateStudentAccountForm.module.css";
import FormRow from "../../../../_components/FormRow/FormRow";
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormNumberInput from "../../../../_components/FormNumberInput/FormNumberInput";
import FormDropDownSelect from "../../../../_components/FormDropDownSelect/FormDropDownSelect";
import FormFileInput from "../../../../_components/FormFileInput/FormFileInput";
import { Industry } from "@/utils/constants/enums";
import FormEmailInput from "../../../../_components/FormEmailInput/FormEmailInput";

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

                    <FormTextInput 
                        labelText="Student ID"
                        textInputName="studentID"
                        placeholderText="Student ID"
                        isRequired={true}
                    />

                    <FormTextInput 
                        labelText="First Name"
                        textInputName="studentFirstName"
                        placeholderText="First Name"
                        isRequired={true}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormTextInput 
                        labelText="Last Name"
                        textInputName="studentLasttName"
                        placeholderText="Last Name"
                        isRequired={true}
                    />

                    <FormDropDownSelect 
                        labelText="Gender" 
                        dropDownSelectName="studentsGender" 
                        options={["Male", "Female"]} 
                        isRequired={true}
                        placeholder="Student's Gender"
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"}
                    horizontalPlacement={"items-center"}
                >
                    
                    <FormNumberInput 
                        labelText="Contact Number"
                        numberInputName="studentContactNumber"
                        placeholderText="Student's Contact Number" 
                        isRequired={true}
                    />

                    <FormNumberInput 
                        labelText="Semester Number"
                        numberInputName="studentSemesterNumber"
                        placeholderText="Student's Semester Number" 
                        isRequired={true}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"}
                    horizontalPlacement={"items-center"}
                >
                    
                    <FormNumberInput 
                        labelText="CGPA"
                        numberInputName="studentCGPA"
                        placeholderText="Student's CGPA" 
                        isRequired={true}
                    />

                    <FormTextInput 
                        labelText="Program"
                        numberInputName="studentProgram"
                        placeholderText="Student's Degree Program" 
                        isRequired={true}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"}
                    horizontalPlacement={"items-center"}
                >

                    <FormEmailInput 
                        labelText="Email" 
                        emailInputName="studentEmailID" 
                        placeholderText="Student's Email ID" 
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