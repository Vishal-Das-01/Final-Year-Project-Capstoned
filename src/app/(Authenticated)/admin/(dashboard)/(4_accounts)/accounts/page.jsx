"use client";

// Imports below for UI creation
import styles from "./AccountPage.module.css";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow";
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell";
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell";
import AccountHeadingAndButton from "./_components/AccountsHeadingAndButton/AccountHeadingAndButton";
import Modal from "../../_components/Modal/Modal";
import AccountsRowContent from "./_components/AccountsRowContent/AccountsRowContent";
import DataTableMessage from "../../_components/DataTableMessage/DataTableMessage";

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { getUsersAPICall } from "@/utils/admin_frontend_api_calls/AccountsAPICalls";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";


// export const metadata = {
// 	title: "Admin Accounts Management",
// 	description: "Capstoned Admin Accounts Management | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardAccountsPage(props){
	// States for managing: modal opening and closing
	// for managing modal title
	// for managing modal content
	// for managing users shown in the table
	// for managing skeleton loading indicator 
	// for managing user role
	// for managing when retrieved data is 0 in size
	// for managing when error occurs in api call
	// for managing when data is changed so that modal closes
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [users, setUsers] = useState([]);
	const [loadingIndicator, setLoadingIndicator] = useState(true);
	const [userRole, setUserRole] = useState("all");
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

	// API Call for fetching all fyp groups
	async function getUsers(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.getUsers;
		setLoadingIndicator(true);

		let apiResponse = await getUsersAPICall(apiURL, accessToken, userRole);
		if(apiResponse.status === HttpStatusCode.Ok){
			setLoadingIndicator(false);
			let apiResponseData = await apiResponse.json();
			setUsers(apiResponseData.data.users);

			console.log("getUsers:", apiResponseData.data.users);
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

			console.log("getUsers error:", "error");
		}
	}

	// API Call for displaying users in the table 
	// when the page is loaded 
	useEffect(() => {
		getUsers();
	}, [])


	// When retrieved data is 0 in size.
	useEffect(() => {
		if(users.length === 0){
			setRetrievedDataIsZero(true);
		}
	}, [users]);

	// When error occurs in retrieving data.
	useEffect(() => {
		if(errorRetrievingData){
			setLoadingIndicator(false);
		}
	}, [errorRetrievingData])

	// Reload the data when data is changed when modal closes
	// such as when accounts are created
	useEffect(() => {
		if(!openModal && dataChanged){
			getUsers();
			setDataChanged(false);
		}
	}, [dataChanged, openModal])

	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<AccountHeadingAndButton 
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

						<TableHeadDataCell isNumberCell={false} text={`Role`}/>

						<TableHeadDataCell isNumberCell={false} text={`Gender`}/>

						<TableHeadDataCell isNumberCell={false} text={`Email`}/>

						<TableHeadDataCell isNumberCell={false} text={`Activated`}/>

					</TableHead>
					
					<tbody>

						{
							!loadingIndicator 

							?

							users.map((user, index) => {
								return (
									<TableRow
										key={user._id}
										setOpenModal={setOpenModal} 
										setModalContent={setModalContent}
										setModalTitle={() => setModalTitle(String(`${user.role !== "Admin" ? `${user.profileID.firstName} ${user.profileID.lastName}` : `${user.profileID.firstName}`}`))}
										content={<AccountsRowContent 
													data={user} 
													dataID={user._id}
												/>}
									>

										<TableBodyDataCell 
											text={String(`${index + 1}`)} 
										/>

										<TableBodyDataCell 
											text={String(`${user.role !== "Admin" ? `${user.profileID.firstName} ${user.profileID.lastName}` : `${user.profileID.firstName}`}`)}
										/>

										<TableBodyDataCell 
											text={String(`${user.role}`)}
										/>

										<TableBodyDataCell 
											text={String(`${user.profileID.gender}`)}
										/>
										
										<TableBodyDataCell 
											text={String(`${user.email}`)}
										/>

										<TableBodyDataCell 
											text={String(`${user.activated ? "Yes" : "No"}`)}
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
								Error fetching users. Please, try again later.
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