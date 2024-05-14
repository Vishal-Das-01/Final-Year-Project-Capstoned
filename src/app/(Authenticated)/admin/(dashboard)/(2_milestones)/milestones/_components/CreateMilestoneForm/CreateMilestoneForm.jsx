"use client";

// Imports below for creating ui
import styles from "./CreateMilestoneForm.module.css";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormRow from "../../../../_components/FormRow/FormRow";   
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton"; 
import FormDateInput from "../../../../_components/FormDateInput/FormDateInput";
import FormNumberInput from "../../../../_components/FormNumberInput/FormNumberInput";
import FormTextArea from "../../../../_components/FormTextArea/FormTextArea";

// Imports below for state management & api calls
import { useEffect, useState } from "react";
import { createNewMilestoneAPICall } from "@/utils/admin_frontend_api_calls/MilestoneAPICalls";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";

export default function CreateMilestoneForm({setOpenModal}){
    let formId = `createMilestoneForm`;

    // For managing state of entire milestone
    const [milestone, setMilestone] = useState({
        "assignmentNumber"   : "",
        "title"              : "",
        "description"        : "",
        "deadline"           : "",
        "percentage"         : "",
        "resources"          : [],
        "year"               : "",
    });

    // For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);

    // For updating milestone state
    function handleChange(event){
        let fieldName = event.target.name;
        let {value}   = event.target;

        if(fieldName === "milestoneAssignmentNumber")
        {    
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "assignmentNumber" : value
            }));
        }
        else if(fieldName === "milestoneTitle"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "title" : value
            }));
        }
        else if(fieldName === "milestoneDeadline"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "deadline" : value
            }));
        }
        else if(fieldName === "milestonePercentageWorth"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "percentage" : value
            }));
        }
        else if(fieldName === "milestoneYear"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "year" : value
            }));
        }
        else if(fieldName === "milestoneDescription"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "description" : value
            }));
        }
        else if(fieldName === "milestoneResources"){
            setMilestone((prevMilestone) => ({
                ...prevMilestone,
                "resources" : [...value]
            }));
        }
        else {
            // Do nothing
        }
    }

    // Function for when form is submitted
    async function submitForm(event){
        event.preventDefault();
        let dataToSend = milestone;
        let accessToken = authDetails.accessToken;
        let apiURL = BACKEND_ROUTES.createMilestone;
        
        let apiCall = await createNewMilestoneAPICall(apiURL, accessToken, dataToSend);
        if(apiCall.status === HttpStatusCode.Ok){
            let apiCallResponse = await apiCall.json();
            console.log("A", apiCallResponse);
        }
        else{
            console.log("B", "Error");
        }
    }

    useEffect(() => {
        // console.log("A", milestone)
    }, [milestone])

    return (
        <div className={`${styles.createMilestoneFormPrimaryContainer} w-full `}>

            <form 
                id={formId} 
                className={`${styles.createMilestoneForm} flex flex-col items-center justify-start`} 
                onSubmit={submitForm}
            >
                
                <FormRow 
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >
                    
                    <FormNumberInput 
                        labelText="Assignment Number"
                        numberInputName="milestoneAssignmentNumber"
                        placeholderText="Assignment Number"
                        isRequired={true}
                        value={milestone.assignmentNumber} 
                        onChange={handleChange}
                    />

                    <FormTextInput 
                        labelText={"Title"} 
                        textInputName={"milestoneTitle"} 
                        placeholderText={"Milestone Title"}
                        isRequired={true}
                        value={milestone.title} 
                        onChange={handleChange}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >

                    <FormDateInput
                        labelText="Deadline"
                        dateInputName="deadline"
                        placeholderText="Milestone Deadline"
                        isRequired={true}
                        setState={setMilestone} 
                    />

                    <FormNumberInput 
                        labelText="Milestone Worth"
                        numberInputName="milestonePercentageWorth"
                        placeholderText="Percentage"
                        isRequired={true}
                        value={milestone.percentage} 
                        onChange={handleChange}
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
                        value={milestone.year} 
                        onChange={handleChange}
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
                        value={milestone.description}
                        onChange={handleChange}
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