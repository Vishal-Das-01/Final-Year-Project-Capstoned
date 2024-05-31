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
import DataTableMessage from "../../_components/DataTableMessage/DataTableMessage";
import CompanyRowContent from "./_components/CompanyRowContent/CompanyRowContent";
import toast from "react-hot-toast";

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { getCompaniesAPICall, deleteCompanyAPICall } from "@/utils/admin_frontend_api_calls/CompaniesAPICalls";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";

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
	// for managing when retrieved data is 0 in size
	// for managing when error occurs in retrieval api call
	// for managing when data is changed so that modal closes
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [companies, setCompanies] = useState([]);
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

	// API Call for fetching all companies
	async function fetchAllCompanies(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getAllCompanies  + `?limit=${10000}`;
		setLoadingIndicator(true);

		let apiResponse = await getCompaniesAPICall(apiURL, accessToken);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setLoadingIndicator(false);
			setCompanies(apiResponseData.data.companies);
			
			console.log("fetchAllCompanies:", apiResponseData);
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
			console.log("fetchAllCompanies error:", apiResponse);
		}
	}

	// API call for deleteing particular company
	async function deleteCompany(id){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.deleteCompany + `id=${id}`;

		try{
			let apiResponse = await deleteCompanyAPICall(apiURL, accessToken);
			if(apiResponse.status === HttpStatusCode.Ok){
				let apiResponseData = await apiResponse.json();
				console.log("deleteCompany:", apiResponseData);
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
				console.log("deleteCompany error:", apiResponse);
				throw new Error(`Can't delete company. Try again.`);
			}
		}
		catch(error){
			throw error;
		}
	}

	// Calls toast message when company is delete
	function callDeleteCompanyToast(id){
		const deleteCompanyResult = deleteCompany(id);

		toast.promise(
			deleteCompanyResult,
			{
				loading: 'Deleting company...',
				success: 'Company deleted!',
				error: (err) => `Failed to delete company. Try again.`
			}
		);

		deleteCompanyResult.then(() => {
			setOpenModal(false);
			setDataChanged(true);
		}).catch((error) => {
			console.log("deleteCompanyResultToast error", error);
		});		
	}

	// API Call for displaying companies in the table 
	// when the page is loaded 
	useEffect(() => {
		fetchAllCompanies();
	}, [])

	// When retrieved data is 0 in size.
	useEffect(() => {
		if(companies.length === 0){
			setRetrievedDataIsZero(true);
		}
	}, [companies]);

	// When error occurs in retrieving data.
	useEffect(() => {
		if(errorRetrievingData){
			setLoadingIndicator(false);
		}
	}, [errorRetrievingData])

	// Reload the data when data is changed when modal closes
	// such as when company is created, updated or deleted
	useEffect(() => {
		if(!openModal && dataChanged){
			fetchAllCompanies();
			setDataChanged(false);
		}
	}, [dataChanged, openModal])

	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<CompaniesHeadingAndButton 
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

						<TableHeadDataCell isNumberCell={false} text={`Name`}/>

						<TableHeadDataCell isNumberCell={false} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Email`}/>

						<TableHeadDataCell isNumberCell={false} text={`City`}/>

						<TableHeadDataCell isNumberCell={false} text={`Verified`}/>

					</TableHead>
					
					<tbody>

						{
							!loadingIndicator

							? 
							
							companies.map((company, index) => {
								return (
									<TableRow
										key={company._id}
										setOpenModal={setOpenModal} 
										setModalContent={setModalContent}
										setModalTitle={() => setModalTitle(company.name)}
										content={<CompanyRowContent 
											data={company} 
											dataID={company._id}
											setModalContent={setModalContent}
											setOpenModal={setOpenModal}
											callDeleteCompanyToast={callDeleteCompanyToast}
											setDataChanged={setDataChanged}
										/>}
									>

										<TableBodyDataCell 
											text={String(index + 1)} 
										/>

										<TableBodyDataCell 
											text={String(`${company.name ? company.name : "N/A"}`)}
										/>

										<TableBodyDataCell 
											text={String(`${company.phone ? company.phone : "N/A"}`)}
										/>

										<TableBodyDataCell 
											text={String(`${company.email ? company.email : "N/A"}`)}
										/>

										<TableBodyDataCell 
											text={String(`${company.city ? company.city : "N/A"}`)}
										/>

										<TableBodyDataCell 
											text={String(`${company.verified ? "Yes" : "No"}`)}
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
								Error fetching companies. Please, try again later.
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