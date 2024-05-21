"use client";

// Imports below for UI creation
import styles from "./ProjectsPage.module.css";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow"; 
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell"; 
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell"; 
import ProjectsHeadingAndButton from "./_components/ProjectsHeadingAndButton/ProjectsHeadingAndButton";
import Modal from "../../_components/Modal/Modal";

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { markProjectFinishedAPICall, getProjectsAPICall } from "@/utils/admin_frontend_api_calls/ProjectsAPICalls";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

// export const metadata = {
// 	title: "Admin Projects Management",
// 	description: "Capstoned Admin Projects Management | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardProjectsPage(props){

	// States for managing: modal opening and closing
	// for managing modal title
	// for managing modal content
	// for managing projects shown in the table
	// for managing skeleton loading indicator 
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [projects, setProjects] = useState([]);
	const [loadingIndicator, setLoadingIndicator] = useState(true);

	// For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);

	// For routing back to landing page if
	// the user is not logged in or
	// if access token has expired
	const dispatch = useDispatch();
	const router = useRouter();

	// API Call for fetching all projects
	async function getAllProjects(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getAllProjects;
		setLoadingIndicator(true);

		let apiResponse = await getProjectsAPICall(apiURL, accessToken);
		// console.log("HERE ", apiResponse);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setProjects(apiResponseData);
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

	// API Call for marking a project finished
	// whose id is passed
	async function markProjectFinished(id){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.markProjectFinished + `${id}`;
		setLoadingIndicator(true);

		let apiResponse = await markProjectFinishedAPICall(apiURL, accessToken);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setProjects(apiResponseData);
			// console.log("A:", apiResponseData);
		}
		else{
			console.log("B:", "error");
		}
	}
	
	// API Call for displaying projects in the table 
	// when the page is loaded 
	useEffect(() => {
		getAllProjects();
	}, [])


	// Turn skeleton loading indicator off when 
	// projects are fetched successfully
	useEffect(() => {
		if(projects.length > 0){
			setLoadingIndicator(false);
		}
		console.log("A:", projects)
	}, [projects]);

	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<ProjectsHeadingAndButton />

				<ContentTable
					isLoading={loadingIndicator}
				>

					<TableHead>

						<TableHeadDataCell isNumberCell={true} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Name`}/>

						<TableHeadDataCell isNumberCell={false} text={`Group`}/>

						<TableHeadDataCell isNumberCell={false} text={`Progress`}/>

						<TableHeadDataCell isNumberCell={false} text={`Status`}/>

						<TableHeadDataCell isNumberCell={false} text={`Finished`}/>

						<TableHeadDataCell isNumberCell={false} text={`Year`}/>

					</TableHead>
					
					<tbody>

						{!loadingIndicator && projects.map((project) => {
							return (
								<TableRow
									setOpenModal={setOpenModal} 
									setModalTitle={setModalTitle}
									setModalContent={setModalContent}
									key={project._id}
									dataID={project._id}
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