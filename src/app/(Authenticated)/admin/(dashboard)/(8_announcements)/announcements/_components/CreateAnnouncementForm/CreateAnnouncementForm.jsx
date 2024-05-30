"use client";

// Imports below for creating ui
import styles from "./CreateAnnouncementForm.module.css"; 
import FormRow from "../../../../_components/FormRow/FormRow";    
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";  
import FormTextArea from "../../../../_components/FormTextArea/FormTextArea";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormDropDownSelect from "../../../../_components/FormDropDownSelect/FormDropDownSelect";
import { NotificationType, NotificationPriority } from "@/utils/constants/enums";

// Imports below for state management & api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { postAnnouncementAPICall } from "@/utils/admin_frontend_api_calls/AnnouncementsAPICalls";

export default function CreateAnnouncementForm({setOpenModal}){
    let formId = `createAnnouncementForm`;

    // For managing state of entire announcement
    const [announcement, setAnnouncement] = useState({
        "headline" : "",
        "description" : "",
        "priority" : "",
        "type" : "",
        "receiver" : ""
    });

    // For managing if To Individual has  
    // been chosen as Notfication Type
    const [isNotificationTypeToIndividual, setIsNotificationTypeToIndividual] = useState(false);

    // For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);

    // For updating announcement state
    function handleChange(event){
        let fieldName = event.target.name;
        let {value}   = event.target;
        
        if(fieldName === "announcementHeadline")
        {    
            setAnnouncement((prevAnnouncement) => ({
                ...prevAnnouncement,
                "headline" : value
            }));
        }
        else if(fieldName === "notificationPriority"){
            setAnnouncement((prevAnnouncement) => ({
                ...prevAnnouncement,
                "priority" : value
            }));
        }
        else if(fieldName === "notificationType"){
            setAnnouncement((prevAnnouncement) => ({
                ...prevAnnouncement,
                "type" : value
            }));
        }
        else if(fieldName === "announcementDescription"){
            setAnnouncement((prevAnnouncement) => ({
                ...prevAnnouncement,
                "description" : value
            }));
        }
        else if(fieldName === "announcementReceiver"){
            setAnnouncement((prevAnnouncement) => ({
                ...prevAnnouncement,
                "receiver" : value
            }));
        }
        else {
            // Do nothing
        }
    }

    // Function for when form is submitted
    async function submitForm(event){
        event.preventDefault();
        let dataToSend = announcement;
        let accessToken = authDetails.accessToken;
        let apiURL = BACKEND_ROUTES.createAnnouncement;
        
        try{
            let apiCall = await postAnnouncementAPICall(apiURL, accessToken, dataToSend);
            if(apiCall.status === HttpStatusCode.Ok){
                let apiCallResponse = await apiCall.json();
                console.log("PostAnnouncementForm", apiCallResponse);
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
                console.log("PostAnnouncementForm error", apiCall);
                throw new Error(`Can't post notification. Try again.`);
            }
        }
        catch(error){
            throw error;
        }
    }

    // When announcement type is changed
    useEffect(() => {
        if(announcement.type === "To Individual"){
            setIsNotificationTypeToIndividual(true);
        }
        else{
            setIsNotificationTypeToIndividual(false);
        }
    }, [announcement])

    return (
        <div className={`${styles.createAnnouncementFormPrimaryContainer} w-full `}>

            <form 
                id={formId} 
                className={`${styles.createAnnouncementForm} flex flex-col items-center justify-start`}
                onSubmit={submitForm}
            >
                
                <FormRow 
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-center"}
                >
                    
                    <FormTextInput 
                        labelText="Headline"
                        textInputName="announcementHeadline"
                        placeholderText="Announcement Headline"
                        isRequired={true}
                        value={announcement.headline} 
                        onChange={handleChange}
                    />

                    <FormDropDownSelect 
                        labelText="Priority"
                        dropDownSelectName="notificationPriority"
                        options={Object.values(NotificationPriority)}
                        isRequired={true}
                        placeholder={"Notification Priority"}
                        selectedValue={announcement.priority}
                        onChange={handleChange}
                        isOnChangePassed={true}
                    />

                </FormRow>

                <FormRow
                    verticalPlacement={"justify-between"} 
                    horizontalPlacement={"items-start"}
                >

                    <FormDropDownSelect 
                        labelText="Type"
                        dropDownSelectName="notificationType"
                        options={Object.values(NotificationType)}
                        isRequired={true}
                        placeholder={"Notification Type"}
                        selectedValue={announcement.type}
                        onChange={handleChange}
                        isOnChangePassed={true}
                    />           

                    {
                        isNotificationTypeToIndividual 
                        && 
                        <FormTextInput 
                            labelText="Receiver"
                            textInputName="announcementReceiver"
                            placeholderText="Announcement Receiver"
                            isRequired={true}
                            value={announcement.receiver} 
                            onChange={handleChange}
                        />         
                    }

                </FormRow>

                <FormRow 
                    verticalPlacement={"justify-start"} 
                    horizontalPlacement={"items-start"}
                >
                    
                    <FormTextArea 
                        labelText="Description"
                        textAreaName="announcementDescription"
                        placeholderText="Announcement Description"
                        isRequired={true}
                        value={announcement.description} 
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