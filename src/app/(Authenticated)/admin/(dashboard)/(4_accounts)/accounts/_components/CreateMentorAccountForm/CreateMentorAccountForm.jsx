"use client";

import styles from "./CreateMentorAccountForm.module.css";
import FormRow from "../../../../_components/FormRow/FormRow";
import FormToggleButton from "../../../../_components/FormToggleButton/FormToggleButton";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormDropDownSelect from "../../../../_components/FormDropDownSelect/FormDropDownSelect";
import FormTextArea from "../../../../_components/FormTextArea/FormTextArea";
import FormNumberInput from "../../../../_components/FormNumberInput/FormNumberInput";
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";
import { Industry } from "@/utils/constants/enums";


export default function CreateMentorAccountForm({setOpenModal}){
    let formId = `createMentorAccountForm`;

    function submitForm(){
        console.log("Submit Form");
    }

    return (
        <div className={`${styles.createMentorAccountFormPrimaryContainer} w-full `}>

            <form id={formId} className={`${styles.createMentorAccountForm} flex flex-col items-center justify-start`}>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >
                    
                    <FormTextInput 
                        labelText="First Name"
                        textInputName="mentorFirstName"
                        placeholderText="First Name"
                        isRequired={true}
                    />

                    <FormTextInput 
                        labelText="Last Name"
                        textInputName="mentorLastName"
                        placeholderText="Last Name"
                        isRequired={true}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormDropDownSelect 
                        labelText="Gender"
                        dropDownSelectName="mentorGender"
                        options={["Male", "Female"]}
                        isRequired={true}
                    />
                    
                    <FormTextInput 
                        labelText="Occupation"
                        textInputName="mentorOccupation"
                        placeholderText="Mentor's Occupation"
                        isRequired={true}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormToggleButton 
                        inactiveLabelText="No"
                        activeLabelText="Yes"
                        isRequired={true}
                        labelText="Is University Teacher"
                        toggleInputName={"isMentorUniversityTeacher"}
                    />

                    <FormToggleButton 
                        inactiveLabelText="No"
                        activeLabelText="Yes"
                        isRequired={true}
                        labelText="Can Mentor Supervise"
                        toggleInputName={"canMentorSupervise"}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >
                    
                    <FormDropDownSelect 
                        labelText="Company"
                        dropDownSelectName="mentorCompany"
                        options={["Vaulsys", "Softech Worldwide"]}
                        isRequired={false}
                        placeholder={"Company Mentor Is In"}
                    />

                    <FormNumberInput 
                        labelText="Contact Number"
                        numberInputName="mentorContact" 
                        placeholderText="Mentor's Contact Number" 
                        isRequired={false}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormDropDownSelect 
                        labelText="Industry"
                        dropDownSelectName="mentorIndustry"
                        options={Object.values(Industry)}
                        isRequired={false}
                        placeholder="Mentor's Industry"
                    />     

                    <FormTextInput 
                        labelText="Room Number" 
                        textInputName="mentorRoomNumber"
                        placeholderText="Mentor's Room Number" 
                        isRequired={false}
                    />               

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormTextArea
                        labelText="Bio"
                        textAreaName={"mentorBio"}
                        placeholderText="Mentor's Bio"
                        isRequired={false}
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