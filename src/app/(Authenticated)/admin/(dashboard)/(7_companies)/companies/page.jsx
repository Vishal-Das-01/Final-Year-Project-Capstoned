"use client";

// Imports below for UI creation
import styles from "./CompaniesPage.module.css";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow"; 
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell"; 
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell"; 
import CompaniesHeadingAndButton from "./_components/CompaniesHeadingAndButton/CompaniesHeadingAndButton";
import Modal from "../../_components/Modal/Modal";

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { getCompaniesAPICall } from "@/utils/admin_frontend_api_calls/CompaniesAPICalls";

// export const metadata = {
// 	title: "Admin Companies Management",
// 	description: "Capstoned Admin Companies Management | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardCompaniesPage(props){

	// States for managing: modal opening and closing
	// for managing modal title
	// for managing modal content
	// for managing companies shown in the table
	// for managing skeleton loading indicator 
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [companies, setCompanies] = useState([]);
	const [loadingIndicator, setLoadingIndicator] = useState(true);

	// For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);

	// API Call for fetching all companies
	async function fetchAllCompanies(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getAllCompanies;
		setLoadingIndicator(true);

		let apiResponse = await getCompaniesAPICall(apiURL, accessToken);
		console.log("HERE ", apiResponse);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setCompanies(apiResponseData);
			// console.log("A:", apiResponseData);
		}
		else{
			console.log("B:", "error");
		}
	}

	// API Call for displaying companies in the table 
	// when the page is loaded 
	useEffect(() => {
		fetchAllCompanies();
	}, [])


	// Turn skeleton loading indicator off when 
	// companies are fetched successfully
	useEffect(() => {
		if(companies.length > 0){
			setLoadingIndicator(false);
		}
		console.log("A:", companies)
	}, [companies]);

	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<CompaniesHeadingAndButton 
					setOpenModal={setOpenModal}
					setModalTitle={setModalTitle}
					setModalContent={setModalContent}
				/>

				<ContentTable>

					<TableHead>

						<TableHeadDataCell isNumberCell={true} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Name`}/>

						<TableHeadDataCell isNumberCell={false} text={`Image`}/>

						<TableHeadDataCell isNumberCell={false} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`City`}/>

						<TableHeadDataCell isNumberCell={false} text={`Projects`}/>

						<TableHeadDataCell isNumberCell={false} text={`Verified`}/>

					</TableHead>
					
					<tbody>

						{!loadingIndicator && companies.map((company) => {
							return (
								<TableRow
									setOpenModal={setOpenModal} 
									setModalTitle={setModalTitle}
									setModalContent={setModalContent}
									key={company._id}
									companyId={company._id}
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