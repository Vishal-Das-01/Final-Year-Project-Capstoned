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
import { getAllMilestonesAPICall } from "@/utils/admin_frontend_api_calls/MilestoneAPICalls";
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
	// for managing milestones shown in the table
	// for managing skeleton loading indicator 
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");
	const [fypGroups, setFYPGroups] = useState([]);
	const [loadingIndicator, setLoadingIndicator] = useState(true);


	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<FYPGroupsHeadingAndButton 
					setOpenModal={setOpenModal}
					setModalTitle={setModalTitle}
					setModalContent={setModalContent}
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

						<TableRow
							setOpenModal={setOpenModal} 
							setModalTitle={setModalTitle}
							setModalContent={setModalContent}
						>

							<TableBodyDataCell text={'1'}/>
								
							<TableBodyDataCell text={'Hamza Akbar'}/>

							<TableBodyDataCell text={'This is dummy text. This is dummy text. This is dummy text. This is dummy text.'}/>
								
							<TableBodyDataCell text={'Pakistan'}/>
							
							<TableBodyDataCell text={'22'}/>
							
							<TableBodyDataCell text={'Pakistan'}/>

							<TableBodyDataCell text={'True'}/>
							
						</TableRow>

						<TableRow
							setOpenModal={setOpenModal} 
							setModalTitle={setModalTitle}
							setModalContent={setModalContent}
						>

							<TableBodyDataCell text={'1'}/>
								
							<TableBodyDataCell text={'Hamza Akbar'}/>

							<TableBodyDataCell text={'This is dummy text. This is dummy text. This is dummy text. This is dummy text.'}/>
								
							<TableBodyDataCell text={'Pakistan'}/>
							
							<TableBodyDataCell text={'22'}/>
							
							<TableBodyDataCell text={'Pakistan'}/>

							<TableBodyDataCell text={'True'}/>
						
						</TableRow>
						
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
