"use client";

// Imports below for UI creation
import styles from "./MilestonesPage.module.css";
import MilestoneHeadingAndButton from "./_components/MilestoneHeadingAndButton/MilestoneHeadingAndButton";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow";
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell";
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell";
import Modal from "../../_components/Modal/Modal";

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { getAllMilestonesAPICall } from "@/utils/admin_frontend_api_calls/MilestoneAPICalls";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

// Import below for getting proper date
import { extractDate } from "@/utils/helpers/func"; 

// export const metadata = {
// 	title: "Admin Milestones",
// 	description: "Capstoned Milestones | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardMilestonesPage(props){

	// States for managing: modal opening and closing
	// for managing modal title
	// for managing modal content
	// for managing milestones shown in the table
	// for managing skeleton loading indicator 
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [milestones, setMilestones] = useState([]);
	const [loadingIndicator, setLoadingIndicator] = useState(true);

	// For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);
	
	// For routing back to landing page if
	// the user is not logged in or
	// if access token has expired
	const dispatch = useDispatch();
	const router = useRouter();

	// API Call for fetching all milestones
	async function getAllMilestones(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getAllMilestones;
		let apiCallMethod = "GET";
		setLoadingIndicator(true);

		let apiResponse = await getAllMilestonesAPICall(apiURL, apiCallMethod, accessToken);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setMilestones(apiResponseData);
			setLoadingIndicator(false);
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

	// API Call for displaying milestones in the table 
	// when the page is loaded 
	useEffect(() => {
		getAllMilestones();
	}, [])


	// Turn skeleton loading indicator off when 
	// milestones are fetched successfully
	useEffect(() => {
		if(milestones.length > 0){
			
		}
	}, [milestones]);


	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<MilestoneHeadingAndButton 
					setOpenModal={setOpenModal}
					setModalTitle={setModalTitle}
					setModalContent={setModalContent}
				/>

				<ContentTable 
					isLoading={loadingIndicator}
				>
			
					<TableHead>

						<TableHeadDataCell isNumberCell={true} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Title`}/>

						<TableHeadDataCell isNumberCell={false} text={`Description`}/>

						<TableHeadDataCell isNumberCell={false} text={`Deadline`}/>

						<TableHeadDataCell isNumberCell={false} text={`Percentage`}/>

						<TableHeadDataCell isNumberCell={false} text={`Year`}/>

					</TableHead>
					
					<tbody>

						{!loadingIndicator && milestones.map((milestone) => {
							return (
								<TableRow
									setOpenModal={setOpenModal} 
									setModalTitle={setModalTitle}
									setModalContent={setModalContent}
									key={milestone.title}
									milestoneId={milestone._id}
								>

									<TableBodyDataCell 
										text={String(milestone.assignmentNumber)} 
									/>

									<TableBodyDataCell 
										text={String(milestone.title)}
									/>

									<TableBodyDataCell 
										text={String(milestone.description)}
									/>
									
									<TableBodyDataCell 
										text={String(extractDate(milestone.deadline))}
									/>
									
									<TableBodyDataCell 
										text={String(milestone.percentage)}
									/>
									
									<TableBodyDataCell 
										text={String(milestone.year)}
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


