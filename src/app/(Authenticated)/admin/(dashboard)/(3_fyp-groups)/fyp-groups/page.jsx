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
import FYPGroupsRowContent from "./_components/FYPGroupsRowContent/FYPGroupsRowContent";

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { getFYPGroupsAPICall, finalizeAllFYPGroupsAPICall } from "@/utils/admin_frontend_api_calls/FYPGroupsAPICalls";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

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

	// For routing back to landing page if
	// the user is not logged in or
	// if access token has expired
	const dispatch = useDispatch();
	const router = useRouter();

	// API Call for fetching all fyp-groups
	async function getAllFYPGroups(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getFYPGroups;
		setLoadingIndicator(true);

		let apiResponse = await getFYPGroupsAPICall(apiURL, accessToken);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setFYPGroups(apiResponseData.data.groups);
			setLoadingIndicator(false);
			console.log("getAllFYPGroups:", apiResponseData.data.groups);
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

	// API Call for finalizing all fyp-groups
	async function finalizeAllFYPGroups(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.finalizeAllFYPGroups;
		// setLoadingIndicator(true);

		let apiResponse = await finalizeAllFYPGroupsAPICall(apiURL, accessToken);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			console.log("finalizeAllFYPGroups:", apiResponseData);
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

	// API Call for displaying fyp-groups in the table 
	// when the page is loaded 
	useEffect(() => {
		getAllFYPGroups();
	}, [])


	// Turn skeleton loading indicator off when 
	// fyp-groups are fetched successfully
	useEffect(() => {
		if(fypGroups.length > 0){
			
		}
		// console.log("A:", fypGroups)
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

				<ContentTable
					isLoading={loadingIndicator}
				>

					<TableHead>

						<TableHeadDataCell isNumberCell={true} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Project Lead`}/>

						<TableHeadDataCell isNumberCell={false} text={`Project`}/>

						<TableHeadDataCell isNumberCell={false} text={`Members`}/>

						<TableHeadDataCell isNumberCell={false} text={`Supervisor`}/>

						<TableHeadDataCell isNumberCell={false} text={`Year`}/>

						<TableHeadDataCell isNumberCell={false} text={`Confirmed`}/>

					</TableHead>
					
					<tbody>

						{!loadingIndicator && fypGroups.map((group, index) => {
							return (
								<TableRow
									key={group._id}
									setOpenModal={setOpenModal} 
									setModalContent={setModalContent}
									setModalTitle={() => setModalTitle(group.name)}
									content={<FYPGroupsRowContent 
										data={group} 
										dataID={group._id}
									/>}
								>

									<TableBodyDataCell 
										text={String(index + 1)} 
									/>

									<TableBodyDataCell 
										text={String(`${group.lead.firstName} ${group.lead.lastName}`)}
									/>

									<TableBodyDataCell 
										text={String(`${(group.project !== null) ? group.project.proposal.title : "Not Available"}`)}
									/>
									
									<TableBodyDataCell 
										text={String( (group.members.length > 0) ? 
														(group.members.map((member) => {
															return `${member.firstName} ${member.lastName}, `
														})) 
														: 
														"Groups has no members."
											)}
									/>
									
									<TableBodyDataCell 
										text={String( (group.supervisor !== null) ? 
														`${group.supervisor.firstName} ${group.supervisor.lastName}`
														:
														"Group has no supervisor."
													)}
									/>
									
									<TableBodyDataCell 
										text={String(`${group.year}`)}
									/>

									<TableBodyDataCell 
										text={String(`${(group.confirmed) ? "Yes" : "No"}`)}
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
