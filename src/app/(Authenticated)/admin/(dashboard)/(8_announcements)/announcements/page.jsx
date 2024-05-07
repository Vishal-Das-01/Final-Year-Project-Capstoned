"use client";

import styles from "./AnnouncementsPage.module.css";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow"; 
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell"; 
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell"; 
import AnnouncementsHeadingAndButton from "./_components/AnnouncementsHeadingAndButton/AnnouncementsHeadingAndButton";
import { useState } from "react";
import Modal from "../../_components/Modal/Modal";

// export const metadata = {
// 	title: "Admin Announcements Management",
// 	description: "Capstoned Admin Announcements Management | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardAnnouncementsPage(props){
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");


	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<AnnouncementsHeadingAndButton 
					setOpenModal={setOpenModal}
					setModalTitle={setModalTitle}
					setModalContent={setModalContent}
				/>

				<ContentTable>

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