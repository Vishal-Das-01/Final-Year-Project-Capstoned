"use client";

// Imports below for creating ui
import styles from "./CreateCompanyForm.module.css";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormRow from "../../../../_components/FormRow/FormRow";
import FormEmailInput from "../../../../_components/FormEmailInput/FormEmailInput";
import FormNumberInput from "../../../../_components/FormNumberInput/FormNumberInput";
import FormToggleButton from "../../../../_components/FormToggleButton/FormToggleButton";
import FormFileInput from "../../../../_components/FormFileInput/FormFileInput";
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";
import toast from "react-hot-toast";

// Imports below for state management & api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { createNewCompanyAPICall } from "@/utils/admin_frontend_api_calls/CompaniesAPICalls";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

export default function CreateCompanyForm({setOpenModal, setDataChanged}){
    let formId = `createCompanyForm`;

    // For managing state of entire company
    const [company, setCompany] = useState({
        "name": "",
        "phone": "",
        "email": "",
        "profileImage": "",
        "webURL": "",
        "linkedinURL": "",
        "city": "",
        "address": "",
        "verified": false,
    });

    // For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);

    // For routing back to landing page if
	// the user is not logged in or
	// if access token has expired
	const dispatch = useDispatch();
	const router = useRouter();

    // For updating company state
    function handleChange(event){
        let fieldName = event.target.name;
        let {value}   = event.target;

        if(fieldName === "companyName")
        {    
            setCompany((prevCompany) => ({
                ...prevCompany,
                "name" : value
            }));
        }
        else if(fieldName === "companyNumber"){
            setCompany((prevCompany) => ({
                ...prevCompany,
                "phone" : value
            }));
        }
        else if(fieldName === "companyEmail"){
            setCompany((prevCompany) => ({
                ...prevCompany,
                "email" : value
            }));
        }
        else if(fieldName === "companyAddress"){
            setCompany((prevCompany) => ({
                ...prevCompany,
                "address" : value
            }));
        }
        else if(fieldName === "companyWebsite"){
            setCompany((prevCompany) => ({
                ...prevCompany,
                "webURL" : value
            }));
        }
        else if(fieldName === "companyLinkedin"){
            setCompany((prevCompany) => ({
                ...prevCompany,
                "linkedinURL" : value
            }));
        }
        else if(fieldName === "companyCity"){
            setCompany((prevCompany) => ({
                ...prevCompany,
                "city" : value
            }));
        }
        else {
            // Do nothing
        }
    }
    
    // Function for when form is submitted
    async function submitForm(event){
        event.preventDefault();
        let dataToSend = company;
        let accessToken = authDetails.accessToken;
        let apiURL = BACKEND_ROUTES.createCompany;
        
        try{
            let apiCall = await createNewCompanyAPICall(apiURL, accessToken, dataToSend);
            if(apiCall.status === HttpStatusCode.Ok){
                let apiCallResponse = await apiCall.json();
                console.log("CreateCompanyForm", apiCallResponse);
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
                console.log("CreateCompanyForm error", apiCall);
                throw new Error(`Can't create company. Try again.`);
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
				loading: 'Creating company...',
				success: 'Company created!',
				error: (err) => `Failed to create company. Try again.`
			}
		);

        submitFormResult.then(() => {
            setOpenModal(false);
            setDataChanged(true);
        }).catch((error) => {
			console.log("CreateCompanyFormToast error", error);
		});	
	}

    // For testing only
    useEffect(() => {
        // console.log("Company", company)
    }, [company])

    return (
        <div className={`${styles.createCompanyFormPrimaryContainer} w-full `}>

            <form 
                id={formId} 
                className={`${styles.createCompanyForm} flex flex-col items-center justify-start`}
                onSubmit={callToast}
            >
                
                <FormRow 
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormTextInput 
                        labelText={"Name"} 
                        textInputName={"companyName"} 
                        placeholderText={"Company Name"}
                        isRequired={true}
                        value={company.name} 
                        onChange={handleChange}
                    />

                    <FormNumberInput
                        labelText="Number"
                        numberInputName="companyNumber"
                        placeholderText="Company Contact Number"
                        isRequired={true}
                        value={company.phone} 
                        onChange={handleChange}
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
                        value={company.email} 
                        onChange={handleChange}
                    />

                    <FormTextInput 
                        labelText={"Address"} 
                        textInputName={"companyAddress"} 
                        placeholderText={"Company Address"}
                        isRequired={false}
                        value={company.address} 
                        onChange={handleChange}
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
                        value={company.webURL} 
                        onChange={handleChange}
                    />

                    <FormTextInput 
                        labelText={"Linkedin URL"} 
                        textInputName={"companyLinkedin"} 
                        placeholderText={"Company Linkedin"}
                        isRequired={false}
                        value={company.linkedinURL} 
                        onChange={handleChange}
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
                        value={company.city} 
                        onChange={handleChange}
                    />

                    <FormToggleButton 
                        inactiveLabelText="No"
                        activeLabelText="Yes"
                        isRequired={false}
                        labelText="Verified"
                        toggleInputName="companyVerified"
                        setState={setCompany}
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
                        setState={setCompany}
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