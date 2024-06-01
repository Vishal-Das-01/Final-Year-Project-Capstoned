"use client";

// Imports below for UI creation
import styles from "./AnnouncementsPage.module.css";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow"; 
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell"; 
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell"; 
import AnnouncementsHeadingAndButton from "./_components/AnnouncementsHeadingAndButton/AnnouncementsHeadingAndButton";
import Modal from "../../_components/Modal/Modal";
import DataTableMessage from "../../_components/DataTableMessage/DataTableMessage";
import AnnouncementsRowContent from "./_components/AnnouncementsRowContent/AnnouncementsRowContent";
import toast from "react-hot-toast";

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { getAnnouncementsAPICall, deleteAnnouncementAPICall } from "@/utils/admin_frontend_api_calls/AnnouncementsAPICalls";
import { NotificationType } from "@/utils/constants/enums";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

// export const metadata = {
// 	title: "Admin Announcements Management",
// 	description: "Capstoned Admin Announcements Management | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardAnnouncementsPage(props){

	// States for managing: modal opening and closing
	// for managing modal title
	// for managing modal content
	// for managing announcements shown in the table
	// for managing skeleton loading indicator 
	// for managing when retrieved data is 0 in size
	// for managing when error occurs in retrieval api call
	// for managing when data is changed so that modal closes
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [announcements, setAnnouncements] = useState([]);
	const [loadingIndicator, setLoadingIndicator] = useState(true);
	const [retrievedDataIsZero, setRetrievedDataIsZero] = useState(false);
	const [errorRetrievingData, setErrorRetrievingData] = useState(false);
	const [dataChanged, setDataChanged] = useState(false);

	// For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);

	// For routing back to landing page if
	// the user is not logged in or
	// if access token has expired
	const dispatch = useDispatch();
	const router = useRouter();

	// API Call for fetching all announcements
	async function fetchAllAnnouncements(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getAnnouncements;
		setLoadingIndicator(true);

		let apiResponse = await getAnnouncementsAPICall(apiURL, accessToken,"all");
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setLoadingIndicator(false);
			setAnnouncements(apiResponseData.data.notifications);

			console.log("fetchAllAnnouncements", apiResponseData);
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
			console.log("fetchAllAnnouncements error", apiResponse);
		}
	}

	// API call for deleting announcement
	async function deleteAnnouncement(id){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.deleteAnnouncement + `?id=${id}`;

		try{
			let apiResponse = await deleteAnnouncementAPICall(apiURL, accessToken);
			if(apiResponse.status === HttpStatusCode.Ok){
				let apiResponseData = await apiResponse.json();
				console.log("deleteAnnouncement", apiResponseData);
				return apiResponseData;
			}
			else if (apiResponse.status === HttpStatusCode.Unauthorized) {
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
				console.log("deleteAnnouncement error", apiResponse);
				throw new Error(`Can't delete announcement. Try again.`);
			}
		}
		catch(error){
			throw error;
		}
	}

	// Calls toast message when announcement is deleted
	function callDeleteAnnouncementToast(id){
		const deleteAnnouncementResult = deleteAnnouncement(id);

		toast.promise(
			deleteAnnouncementResult,
			{
				loading: 'Deleting announcement...',
				success: 'Announcement deleted!',
				error: (err) => "Failed to delete announcement. Try again"
			}
		);

		deleteAnnouncementResult.then(() => {
			setOpenModal(false);
			setDataChanged(true);
		}).catch((error) => {
			console.log("DeleteAnnouncementToast error", error);
		});		
	}

	// API Call for displaying announcements  
	// in the table when the page is loaded 
	useEffect(() => {
		fetchAllAnnouncements();
	}, [])


	// When retrieved data is 0 in size.
	useEffect(() => {
		if(announcements.length === 0){
			setRetrievedDataIsZero(true);
		}
	}, [announcements]);

	// When error occurs in retrieving data.
	useEffect(() => {
		if(errorRetrievingData){
			setLoadingIndicator(false);
		}
	}, [errorRetrievingData])

	// Reload the data when data is changed when modal closes
	// such as when announcement is created, posted, updated or deleted
	useEffect(() => {
		if(!openModal && dataChanged){
			fetchAllAnnouncements();
			setDataChanged(false);
		}
	}, [dataChanged, openModal])


	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<AnnouncementsHeadingAndButton 
					setOpenModal={setOpenModal}
					setModalTitle={setModalTitle}
					setModalContent={setModalContent}
					setDataChanged={setDataChanged}
				/>

				<ContentTable
					isLoading={loadingIndicator}
				>

					<TableHead>

						<TableHeadDataCell isNumberCell={true} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Headline`}/>

						<TableHeadDataCell isNumberCell={false} text={`Description`}/>

						<TableHeadDataCell isNumberCell={false} text={`Priority`}/>

						<TableHeadDataCell isNumberCell={false} text={`Type`}/>

						<TableHeadDataCell isNumberCell={false} text={`Sender`}/>

						<TableHeadDataCell isNumberCell={false} text={`Activated`}/>

					</TableHead>
					
					<tbody>

						{
							!loadingIndicator 
							
							? 
							
							announcements.map((announcement, index) => {
								return (
									<TableRow
										key={announcement._id}
										setOpenModal={setOpenModal} 
										setModalContent={setModalContent}
										setModalTitle={() => setModalTitle(announcement.headline)}
										content={<AnnouncementsRowContent 
											data={announcement} 
											dataID={announcement._id}
											setModalContent={setModalContent}
											setOpenModal={setOpenModal}
											callDeleteAnnouncementToast={callDeleteAnnouncementToast}
											setDataChanged={setDataChanged}
										/>}
									>

										<TableBodyDataCell 
											text={String(index +  1)} 
										/>

										<TableBodyDataCell 
											text={String(`${announcement.headline}`)}
										/>

										<TableBodyDataCell 
											text={String(`${announcement.description}`)}
										/>
										
										<TableBodyDataCell 
											text={String(`${announcement.priority}`)}
										/>
										
										<TableBodyDataCell 
											text={String(`${announcement.type}`)}
										/>
										
										<TableBodyDataCell 
											text={String(`${announcement.sender ? (announcement.sender.firstName.includes("Admin") ? announcement.sender.firstName : announcement.sender.firstName + " " + announcement.sender.lastName) : "N/A"}`)}
										/>

										<TableBodyDataCell 
											text={String(`${announcement.activated ? "Yes" : "No"}`)}
										/>
										
									</TableRow>
								)
							})

							:

							retrievedDataIsZero
							
							?

							<DataTableMessage>
								Nothing to show. Please, add some data.
							</DataTableMessage>
							
							:

							errorRetrievingData
							
							?

							<DataTableMessage>
								Error fetching announcements. Please, try again later.
							</DataTableMessage>

							:

							<div></div>

						}
						
					</tbody>
					
				</ContentTable>
				
			</div>

			{
				openModal 
				&&
				<Modal 
					closeModal={() => setOpenModal(false)}
					modalHeadingText= {modalTitle}
				>
					{modalContent}
				</Modal>
			}

		</div>
	);
}