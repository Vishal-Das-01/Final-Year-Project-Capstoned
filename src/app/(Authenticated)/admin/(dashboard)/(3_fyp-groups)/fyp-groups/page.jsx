"use client";

// Imports below for UI creation
import styles from "./FYPGroups.module.css";
import FYPGroupsHeadingAndButton from "./_components/FYPGroupsHeadingAndButton/FYPGroupsHeadingAndButton";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow";
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell";
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell";
import Modal from "../../_components/Modal/Modal";

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { getFYPGroupsAPICall, finalizeAllFYPGroupsAPICall } from "@/utils/admin_frontend_api_calls/FYPGroupsAPICalls";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";

// export const metadata = {
// 	title: "Admin FYP Groups",
// 	description: "Capstoned FYP Groups | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardFYPGroupsPage(props){
	
	// States for managing: modal opening and closing
	// for managing modal title
	// for managing modal content
	// for managing fyp groups shown in the table
	// for managing skeleton loading indicator 
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [fypGroups, setFYPGroups] = useState([]);
	const [loadingIndicator, setLoadingIndicator] = useState(true);

	// For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);

	// API Call for fetching all fyp-groups
	async function getAllFYPGroups(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getFYPGroups;
		setLoadingIndicator(true);

		let apiResponse = await getFYPGroupsAPICall(apiURL, accessToken);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setFYPGroups(apiResponseData.data.groups);
			// console.log("A:", apiResponseData);
		}
		else{
			console.log("B:", "error");
		}
	}

	// API Call for finalizing all fyp-groups
	async function finalizeAllFYPGroups(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.finalizeAllFYPGroups;
		// setLoadingIndicator(true);

		let apiResponse = await finalizeAllFYPGroupsAPICall(apiURL, accessToken);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			console.log("A:", apiResponseData);
		}
		else{
			console.log("B:", "error");
		}
	}

	// API Call for displaying fyp-groups in the table 
	// when the page is loaded 
	useEffect(() => {
		getAllFYPGroups();
	}, [])


	// Turn skeleton loading indicator off when 
	// fyp-groups are fetched successfully
	useEffect(() => {
		if(fypGroups.length > 0){
			setLoadingIndicator(false);
		}
		console.log("A:", fypGroups)
	}, [fypGroups]);


	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<FYPGroupsHeadingAndButton 
					// setOpenModal={setOpenModal}
					// setModalTitle={setModalTitle}
					// setModalContent={setModalContent}
					onClick={finalizeAllFYPGroups}
				/>

				<ContentTable>

					<TableHead>

						<TableHeadDataCell isNumberCell={true} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Name`}/>

						<TableHeadDataCell isNumberCell={false} text={`Project`}/>

						<TableHeadDataCell isNumberCell={false} text={`Members`}/>

						<TableHeadDataCell isNumberCell={false} text={`Supervisor`}/>

						<TableHeadDataCell isNumberCell={false} text={`Mentors`}/>

						<TableHeadDataCell isNumberCell={false} text={`Confirmed`}/>

					</TableHead>
					
					<tbody>

						{!loadingIndicator && fypGroups.map((group) => {
							return (
								<TableRow
									setOpenModal={setOpenModal} 
									setModalTitle={setModalTitle}
									setModalContent={setModalContent}
									key={group._id}
									groupId={group._id}
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
