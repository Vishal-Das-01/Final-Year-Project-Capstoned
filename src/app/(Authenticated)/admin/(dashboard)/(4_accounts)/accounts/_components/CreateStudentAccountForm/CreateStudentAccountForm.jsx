"use client";

// Imports for creating UI 
import styles from "./CreateStudentAccountForm.module.css";
import FormRow from "../../../../_components/FormRow/FormRow";
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormNumberInput from "../../../../_components/FormNumberInput/FormNumberInput";
import FormDropDownSelect from "../../../../_components/FormDropDownSelect/FormDropDownSelect";
import FormEmailInput from "../../../../_components/FormEmailInput/FormEmailInput";
import toast from 'react-hot-toast';

// Imports for state management
import { useState } from "react";
import { useSelector } from "react-redux";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { createAccountAPICall } from "@/utils/admin_frontend_api_calls/AccountsAPICalls";
import { HttpStatusCode } from "axios";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function CreateStudentAccountForm({setOpenModal, setDataChanged}){
    let formId = `createStudentAccountForm`;

    // For managing state of entire student
    const [student, setStudent] = useState({
        "role"                     : "Student",
        "studentID"                : "",
        "studentFirstName"         : "",
        "studentLastName"          : "",
        "studentGender"            : "",
        "studentContactNumber"     : "",
        "studentSemesterNumber"    : "",
        "studentCGPA"              : "",
        "studentProgram"           : "",
        "studentEmailID"           : "",
    });

    // For access token retrieval
    const authDetails = useSelector((state) => state.AuthDetails);

    // For routing back to landing page if
	// the user is not logged in or
	// if access token has expired
	const dispatch = useDispatch();
	const router = useRouter();

    // For updating student state
    function handleChange(event){
        let fieldName = event.target.name;
        let {value}   = event.target;
        if(fieldName === "studentID")
        {    
            setStudent((prevStudent) => ({
                ...prevStudent,
                "studentID" : value
            }));
        }
        else if(fieldName === "studentFirstName")
        {    
            setStudent((prevStudent) => ({
                ...prevStudent,
                "studentFirstName" : value
            }));
        }
        else if(fieldName === "studentLastName"){
            setStudent((prevStudent) => ({
                ...prevStudent,
                "studentLastName" : value
            }));
        }
        else if(fieldName === "studentGender"){
            setStudent((prevStudent) => ({
                ...prevStudent,
                "studentGender" : value
            }));
        }
        else if(fieldName === "studentContactNumber"){
            setStudent((prevStudent) => ({
                ...prevStudent,
                "studentContactNumber" : value
            }));
        }
        else if(fieldName === "studentSemesterNumber"){
            setStudent((prevStudent) => ({
                ...prevStudent,
                "studentSemesterNumber" : value
            }));
        }
        else if(fieldName === "studentCGPA"){
            setStudent((prevStudent) => ({
                ...prevStudent,
                "studentCGPA" : value
            }));
        }
        else if(fieldName === "studentProgram"){
            setStudent((prevStudent) => ({
                ...prevStudent,
                "studentProgram" : value
            }));
        }
        else if(fieldName === "studentEmailID"){
            setStudent((prevStudent) => ({
                ...prevStudent,
                "studentEmailID" : value
            }));
        }
        else {
            // Do nothing
        }
    }

    // Function for when form is submitted
    async function submitForm(event){
        event.preventDefault();
        let dataToSend = {
            "email"   : student.studentEmailID,
            "role"    : student.role,
            "details" : {
                "studentID"           : student.studentID,          
                "firstName"           : student.studentFirstName,
                "lastName"            : student.studentLastName,
                "gender"              : student.studentGender,
                "contact"             : student.studentContactNumber,
                "semester"            : student.studentSemesterNumber,   
                "gpa"                 : student.studentCGPA,
                "program"             : student.studentProgram,
            } 
        }
        let accessToken = authDetails.accessToken;
        let apiURL = BACKEND_ROUTES.createUser;
        
        try{
            let apiCall = await createAccountAPICall(apiURL, accessToken, dataToSend);
            if(apiCall.status === HttpStatusCode.Ok){
                let apiCallResponse = await apiCall.json();
                console.log("createStudentAccount", apiCallResponse);
                return apiCallResponse;
            }
            else if (apiCall.status === HttpStatusCode.Unauthorized) {
                const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
                    method: "POST",
                });
                if (responseLogOut.status === HttpStatusCode.Ok) {
                    dispatch(removeAuthDetails());
                    router.replace(FRONTEND_ROUTES.landing_page);
                }
                throw new Error('Unauthorized');
            }
            else{
                console.log("createStudentAccount error", apiCall);
                throw new Error(`Can't create student account. Try again.`);
            }
        }
        catch(error){
            throw error;
        }
    }

    // Calls toast message
	function callToast(event){
        const submitFormResult = submitForm(event);

		toast.promise(
			submitFormResult,
			{
				loading: 'Creating new student account...',
				success: 'Student account created!',
				error: (err) => `Failed to create student account. Try again.`
			}
		);

        submitFormResult.then(() => {
            setOpenModal(false);
            setDataChanged(true);
        }).catch((error) => {
			console.log("CreateStudentAccountFormToast error", error);
		});	
	}

    return (
        <div className={`${styles.createStudentAccountFormPrimaryContainer} w-full `}>

            <form 
                id={formId} 
                className={`${styles.createStudentAccountForm} flex flex-col items-center justify-start`}
                onSubmit={callToast}
            >

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormTextInput 
                        labelText="Student ID"
                        textInputName="studentID"
                        placeholderText="Student ID"
                        isRequired={true}
                        value={student.studentID}
                        onChange={handleChange}
                    />

                    <FormTextInput 
                        labelText="First Name"
                        textInputName="studentFirstName"
                        placeholderText="First Name"
                        isRequired={true}
                        value={student.studentFirstName}
                        onChange={handleChange}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormTextInput 
                        labelText="Last Name"
                        textInputName="studentLastName"
                        placeholderText="Last Name"
                        isRequired={true}
                        value={student.studentLastName}
                        onChange={handleChange}
                    />

                    <FormDropDownSelect 
                        labelText="Gender" 
                        dropDownSelectName="studentGender" 
                        options={["Male", "Female"]} 
                        isRequired={true}
                        placeholder="Student's Gender"
                        selectedValue={student.studentGender}
                        isOnChangePassed={true}
                        onChange={handleChange}
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
                        value={student.studentContactNumber}
                        onChange={handleChange}
                    />

                    <FormNumberInput 
                        labelText="Semester Number"
                        numberInputName="studentSemesterNumber"
                        placeholderText="Student's Semester Number" 
                        isRequired={true}
                        value={student.studentSemesterNumber}
                        onChange={handleChange}
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
                        value={student.studentCGPA}
                        onChange={handleChange}
                    />

                    <FormTextInput 
                        labelText="Program"
                        textInputName="studentProgram"
                        placeholderText="Student's Degree Program"
                        isRequired={true}
                        value={student.studentProgram}
                        onChange={handleChange}
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
                        value={student.studentEmailID}
                        onChange={handleChange}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-end"}
                    horizontalPlacement={"items-center"}
                >
                    
                    <FormActionButton 
                        buttonText={`Save`}
                        buttonClickAction={callToast}
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