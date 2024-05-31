"use client";

// Imports below for creating ui
import styles from "./UpdateAnnouncementForm.module.css" 
import FormRow from "../../../../_components/FormRow/FormRow";    
import FormActionButton from "../../../../_components/FormActionButton/FormActionButton";  
import FormTextArea from "../../../../_components/FormTextArea/FormTextArea";
import FormTextInput from "../../../../_components/FormTextInput/FormTextInput";
import FormDropDownSelect from "../../../../_components/FormDropDownSelect/FormDropDownSelect";
import { NotificationType, NotificationPriority } from "@/utils/constants/enums";
import FormUserDropDownSelect from "../../../../_components/FormUserDropDownSelect/FormUserDropDownSelect";

// Imports below for state management & api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { getUsersAPICall } from "@/utils/admin_frontend_api_calls/AccountsAPICalls";

export default function UpdateAnnouncementForm({data, dataID, setOpenModal, setDataChanged}){
    let formId = `updateAnnouncementForm`;

    // For managing state of entire announcement
    const [announcement, setAnnouncement] = useState({
        "headline" : data.headline,
        "description" : data.description,
        "priority" : data.priority,
        "type" : data.type,
        "receiver" : data.receiver
    });

    // For managing users state
    const [users, setUsers] = useState([]);

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
        let apiURL = BACKEND_ROUTES.updateAnnouncement + `?id=${dataID}`;
        
        try{
            let apiCall = await updateAnnouncementAPICall(apiURL, accessToken, dataToSend);
            if(apiCall.status === HttpStatusCode.Ok){
                let apiCallResponse = await apiCall.json();
                console.log("UpdateAnnouncementForm", apiCallResponse);
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
                console.log("UpdateAnnouncementForm error", apiCall);
                throw new Error(`Can't update notification. Try again.`);
            }
        }
        catch(error){
            throw error;
        }
    }

    // Function for fetching all users
    // when To Individual Is Chosen
	async function getUsers(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getUsers;

		let apiResponse = await getUsersAPICall(apiURL, accessToken, "all");
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setUsers(apiResponseData.data.users);

			console.log("getUsers in CreateAnnouncementForm:", apiResponseData.data.users);
		}
		else if (apiResponse.status === HttpStatusCode.Unauthorized) {
			const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
			  method: "POST",
			});
			if (responseLogOut.status === HttpStatusCode.Ok) {
			  dispatch(removeAuthDetails());
			  router.replace(FRONTEND_ROUTES.landing_page);
			}
		}
		else{
			setErrorRetrievingData(true);

			console.log("getUsers in CreateAnnouncementForm error:", "error");
		}
	}

    // Calls toast message
	function callToast(event){
        const submitFormResult = submitForm(event);

		toast.promise(
			submitFormResult,
			{
				loading: 'Updating announcement...',
				success: 'Announcement updated!',
				error: (err) => `Failed to update announcement: ${err.message}`
			}
		);

        submitFormResult.then(() => {
            setOpenModal(false);
            setDataChanged(true);
        }).catch((error) => {
            console.log("CreateAnnouncementFormToast", error.message);
        });
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

    // When To Individual is chosen
    useEffect(() => {
        if(isNotificationTypeToIndividual && users.length === 0){
            getUsers();
        }
    }, [isNotificationTypeToIndividual])

    // for testing
    useEffect(() => {
        // console.log("UpdateAnnouncementForm", announcement);
    }, [announcement])

    return (
        <div className={`${styles.createAnnouncementFormPrimaryContainer} w-full `}>

            <form 
                id={formId} 
                className={`${styles.createAnnouncementForm} flex flex-col items-center justify-start`}
                onSubmit={callToast}
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
                        // <FormTextInput 
                        //     labelText="Receiver"
                        //     textInputName="announcementReceiver"
                        //     placeholderText="Announcement Receiver"
                        //     isRequired={true}
                        //     value={announcement.receiver} 
                        //     onChange={handleChange}
                        // />
                        <FormUserDropDownSelect 
                            labelText="Receiver"
                            dropDownSelectName="announcementReceiver"
                            options={users}
                            isRequired={true}
                            placeholder={"Announcement Receiver"}
                            selectedValue={announcement.receiver}
                            onChange={handleChange}
                            isOnChangePassed={true}
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