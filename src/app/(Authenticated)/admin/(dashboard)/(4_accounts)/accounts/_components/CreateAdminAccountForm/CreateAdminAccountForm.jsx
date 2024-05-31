"use client";

// Imports for creating UI
import styles from "./CreateAdminAccountForm.module.css";
import FormRow from "../../../../_components/FormRow/FormRow";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormDropDownSelect from "../../../../_components/FormDropDownSelect/FormDropDownSelect";
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";
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

export default function CreateAdminAccountForm({setOpenModal, setDataChanged}){
    let formId = `createAdminAccountForm`;

    // For managing state of entire admin
    const [admin, setAdmin] = useState({
        "role"                     : "Admin",
        "adminFirstName"           : "",
        "adminLastName"            : "",
        "adminGender"              : "",
        "adminEmailID"             : "",
    });

    // For access token retrieval
    const authDetails = useSelector((state) => state.AuthDetails);

    // For routing back to landing page if
	// the user is not logged in or
	// if access token has expired
	const dispatch = useDispatch();
	const router = useRouter();

    // For updating admin state
    function handleChange(event){
        let fieldName = event.target.name;
        let {value}   = event.target;
        if(fieldName === "adminFirstName")
        {    
            setAdmin((prevAdmin) => ({
                ...prevAdmin,
                "adminFirstName" : value
            }));
        }
        else if(fieldName === "adminLastName"){
            setAdmin((prevAdmin) => ({
                ...prevAdmin,
                "adminLastName" : value
            }));
        }
        else if(fieldName === "adminGender"){
            setAdmin((prevAdmin) => ({
                ...prevAdmin,
                "adminGender" : value
            }));
        }
        else if(fieldName === "adminEmailID"){
            setAdmin((prevAdmin) => ({
                ...prevAdmin,
                "adminEmailID" : value
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
            "email"   : admin.adminEmailID,
            "role"    : admin.role,
            "details" : {
                "firstName"           : admin.adminFirstName,
                "lastName"            : admin.adminLastName,
                "gender"              : admin.adminGender
            } 
        }
        let accessToken = authDetails.accessToken;
        let apiURL = BACKEND_ROUTES.createUser;
        
        try{
            let apiCall = await createAccountAPICall(apiURL, accessToken, dataToSend);
            if(apiCall.status === HttpStatusCode.Ok){
                let apiCallResponse = await apiCall.json();
                console.log("createAdminAccount", apiCallResponse);
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
                console.log("createAdminAccount", apiCall);
                throw new Error(`Can't create admin account. Try again.`);
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
				loading: 'Creating new admin account...',
				success: 'Admin account created!',
				error: (err) => `Failed to create admin account: ${err.message}`
			}
		);

        submitFormResult.then(() => {
            setOpenModal(false);
            setDataChanged(true);
        });
	}

    return (
        <div className={`${styles.createAdminAccountFormPrimaryContainer} w-full `}>

            <form 
                id={formId} 
                className={`${styles.createAdminAccountForm} flex flex-col items-center justify-start`}
                onSubmit={callToast}
            >

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
                        onChange={handleChange}
                        value={admin.adminFirstName}
                    />

                    <FormTextInput 
                        labelText="Last Name"
                        textInputName="adminLastName"
                        placeholderText="Last Name"
                        isRequired={true}
                        onChange={handleChange}
                        value={admin.adminLastName}
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
                        selectedValue={admin.adminGender}
                        isOnChangePassed={true}
                        onChange={handleChange}
                    />

                    <FormEmailInput 
                        labelText="Email" 
                        emailInputName={"adminEmailID"} 
                        placeholderText="Admin's Email ID" 
                        isRequired={true}
                        value={admin.adminEmailID}
                        onChange={handleChange}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-end"}
                    horizontalPlacement={"items-end"}
                    rowHeight={"h-56"}
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