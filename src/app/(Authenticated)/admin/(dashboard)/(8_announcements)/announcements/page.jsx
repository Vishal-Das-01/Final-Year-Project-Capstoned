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

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { getAnnouncementsAPICall } from "@/utils/admin_frontend_api_calls/AnnouncementsAPICalls";
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
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [announcements, setAnnouncements] = useState([]);
	const [loadingIndicator, setLoadingIndicator] = useState(true);

	// For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);

	// For routing back to landing page if
	// the user is not logged in or
	// if access token has expired
	const dispatch = useDispatch();
	const router = useRouter();

	// API Call for fetching all announcements
	async function fetchAnnouncements(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getAnnouncements;
		setLoadingIndicator(true);

		let apiResponse = await getAnnouncementsAPICall(apiURL, accessToken,"all");
		// console.log("HERE ", apiResponse);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setAnnouncements(apiResponseData.data.notifications);
			// console.log("A:", apiResponseData);
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
			console.log("B:", "error");
		}
	}

	// API Call for displaying announcements  
	// in the table when the page is loaded 
	useEffect(() => {
		fetchAnnouncements();
	}, [])


	// Turn skeleton loading indicator off when 
	// announcements are fetched successfully
	useEffect(() => {
		if(announcements.length > 0){
			setLoadingIndicator(false);
		}
		console.log("A:", announcements)
	}, [announcements]);


	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<AnnouncementsHeadingAndButton 
					setOpenModal={setOpenModal}
					setModalTitle={setModalTitle}
					setModalContent={setModalContent}
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

						<TableHeadDataCell isNumberCell={false} text={`Receiver`}/>

						<TableHeadDataCell isNumberCell={false} text={`Activated`}/>

					</TableHead>
					
					<tbody>

						{!loadingIndicator && announcements.map((announcement) => {
							return (
								<TableRow
									setOpenModal={setOpenModal} 
									setModalTitle={setModalTitle}
									setModalContent={setModalContent}
									key={announcement._id}
									companyId={announcement._id}
								>

									<TableBodyDataCell 
										text={String("milestone.assignmentNumber")} 
									/>

									<TableBodyDataCell 
										text={String("milestone.title")}
									/>

									<TableBodyDataCell 
										text={String("milestone.description")}
									/>
									
									<TableBodyDataCell 
										text={String("extractDate(milestone.deadline)")}
									/>
									
									<TableBodyDataCell 
										text={String("milestone.percentage")}
									/>
									
									<TableBodyDataCell 
										text={String("milestone.year")}
									/>
									
								</TableRow>
							)
						})}
						
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