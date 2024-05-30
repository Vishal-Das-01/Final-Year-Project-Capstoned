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
import ProjectsRowContent from "./_components/ProjectsRowContent/ProjectsRowContent";
import DataTableMessage from "../../_components/DataTableMessage/DataTableMessage";
import toast from 'react-hot-toast';

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
	// for managing when retrieved data is 0 in size
	// for managing when error occurs in retrieval api call
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [projects, setProjects] = useState([]);
	const [loadingIndicator, setLoadingIndicator] = useState(true);
	const [retrievedDataIsZero, setRetrievedDataIsZero] = useState(false);
	const [errorRetrievingData, setErrorRetrievingData] = useState(false);

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
			setLoadingIndicator(false);
			let apiResponseData = await apiResponse.json();
			setProjects(apiResponseData);
			
			console.log("getAllProjects:", apiResponseData);
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
			console.log("getAllProjects error:", "error");
		}
	}

	// Delete this code below
	function delay(seconds) {
		return new Promise(resolve => setTimeout(resolve, seconds * 1000));
	}
	// Delete this code above

	// API Call for marking a project finished
	// whose id is passed
	async function markProjectFinished(id){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.markProjectFinished + `${id}`;

		try{

			let apiResponse = await markProjectFinishedAPICall(apiURL, accessToken);
			if(apiResponse.status === HttpStatusCode.Ok){
				let apiResponseData = await apiResponse.json();
				
				console.log("markProjectFinished:", apiResponseData);
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
				console.log("markProjectFinished error:", apiResponse);
				throw new Error(`Can't finalize project. Try again.`);
			}
		}
		catch(error){
			throw error;
		}
	}

	// Calls toast message
	function callToast(id){
		toast.promise(
			markProjectFinished(id),
			{
				loading: 'Marking project as finished...',
				success: 'Project marked as finished!',
				error: (err) => `Failed to mark project: ${err.message}`
			}
		);
	}
	
	// API Call for displaying projects in the table 
	// when the page is loaded 
	useEffect(() => {
		getAllProjects();
	}, [])


	// When retrieved data is 0 in size.
	useEffect(() => {
		if(projects.length === 0){
			setRetrievedDataIsZero(true);
		}
	}, [projects]);

	// When error occurs in retrieving data.
	useEffect(() => {
		if(errorRetrievingData){
			setLoadingIndicator(false);
		}
	}, [errorRetrievingData])

	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<ProjectsHeadingAndButton />

				<ContentTable
					isLoading={loadingIndicator}
				>

					<TableHead>

						<TableHeadDataCell isNumberCell={true} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Group Name`}/>

						<TableHeadDataCell isNumberCell={false} text={`Progress`}/>

						<TableHeadDataCell isNumberCell={false} text={`Status`}/>

						<TableHeadDataCell isNumberCell={false} text={`Year`}/>

						<TableHeadDataCell isNumberCell={false} text={`Finished`}/>


					</TableHead>
					
					<tbody>

						{
							!loadingIndicator 
							? 
							projects.map((project, index) => {
								return (
									<TableRow
										key={project._id}
										setOpenModal={setOpenModal} 
										setModalContent={setModalContent}
										setModalTitle={() => setModalTitle(`${project.group.name}`)}
										content={<ProjectsRowContent 
											data={project} 
											dataID={project._id}
											markProjectFinished={callToast}
											setModalContent={setModalContent}
										/>}
									>

										<TableBodyDataCell 
											text={String(`${index +  1}`)} 
										/>

										<TableBodyDataCell 
											text={String(`${project.group.name}`)}
										/>

										
										<TableBodyDataCell 
											text={String(`${project.progress}`)}
										/>
										
										<TableBodyDataCell 
											text={String(`${project.status}`)}
										/>

										<TableBodyDataCell 
											text={String(`${project.year}`)}
										/>

										<TableBodyDataCell 
											text={String(`${project.finished ? "Yes" : "No"}`)}
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
								Error fetching projects. Please, try again later.
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