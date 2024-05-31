import { useState } from "react";
import styles from "./CreateUserAccountForm.module.css";
import CreateAdminAccountForm from "../CreateAdminAccountForm/CreateAdminAccountForm";
import CreateMentorAccountForm from "../CreateMentorAccountForm/CreateMentorAccountForm";
import CreateStudentAccountForm from "../CreateStudentAccountForm/CreateStudentAccountForm";
import FormRow from "../../../../_components/FormRow/FormRow";
import FormDropDownSelect from "../../../../_components/FormDropDownSelect/FormDropDownSelect";

export default function CreateUserAccountForm({setOpenModal, setDataChanged}){
    // This state is for choosing the form type chosen in the FormDropDownSelect child component
    const [formType, setFormType] = useState("");

    // Function for setting the form type chosen in the FormDropDownSelect child component
    function chooseFormType(formType){
        if(formType == "admin")
            return <CreateAdminAccountForm setOpenModal={setOpenModal} setDataChanged={setDataChanged}/>;
        else if(formType == "mentor")
            return <CreateMentorAccountForm setOpenModal={setOpenModal} setDataChanged={setDataChanged}/>;
        else if(formType == "student")
            return <CreateStudentAccountForm setOpenModal={setOpenModal} setDataChanged={setDataChanged}/>;
        else
            return <></>;
    }

    return (
        <div className={`${styles.createUserAccountFormPrimaryContainer} w-full `}>

            <FormRow
                verticalPlacement={"justify-between"} 
                horizontalPlacement={"items-center"}
            >

                <FormDropDownSelect 
                    labelText="Account Type"
                    dropDownSelectName="userAccountType" 
                    options={["Admin", "Mentor", "Student"]} 
                    isRequired={false} 
                    placeholder={"User Account Type"}
                    selectedValue={formType}
                    setSelectedValue={setFormType}
                />

            </FormRow>

            {chooseFormType(formType)}

        </div>
    );
}