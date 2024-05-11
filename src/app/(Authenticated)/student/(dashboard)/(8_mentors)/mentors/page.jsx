"use client";

import styles from "./CompaniesPage.module.css";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow"; 
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell"; 
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell"; 
import CompaniesHeadingAndButton from "./_components/CompaniesHeadingAndButton/CompaniesHeadingAndButton";
import Modal from "../../_components/Modal/Modal";
import { useState } from "react";

// export const metadata = {
// 	title: "Admin Companies Management",
// 	description: "Capstoned Admin Companies Management | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardCompaniesPage(props){
	const [openModal, setOpenModal]   = useState(false);
	const [modalTitle, setModalTitle] = useState("");
	const [modalContent, setModalContent] = useState("");

	const tailwindColorClasses = [
		"bg-red-100",
		"bg-blue-100",
		"bg-green-100",
		"bg-yellow-100",
		"bg-indigo-100",
		"bg-purple-100",
		"bg-pink-100",
		"bg-gray-100",
	  ];
	
	  const generateRandomColor = () => {
		const randomIndex = Math.floor(Math.random() * tailwindColorClasses.length);
		return tailwindColorClasses[randomIndex];
	  };

	  const list = [
		"Software Engineering",
		"Security",
		"Network Security",
		"Cloud Security",
		"Application Security",
		"Machine Learning",
		"Artificial Intelligence",
		"Mobile App Development",
		"Backend Engineering",
		"Frontend Engineering",
	  ];
	

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

						<TableHeadDataCell isNumberCell={false} text={`Occupation`}/>

						<TableHeadDataCell isNumberCell={false} text={`Industries`}/>

						<TableHeadDataCell isNumberCell={false} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Room`}/>

						<TableHeadDataCell isNumberCell={false} text={`Available`}/>

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
								
							<TableBodyDataCell text={list.map((item, index) => {
          const randomColorClass = generateRandomColor();
          return (
            <button
              key={index}
              type="button"
              className={`${randomColorClass} inline-flex justify-center items-center rounded-xl p-2 text-xs mr-2 my-1 `}
            >
              {item}
            </button>
          );
        })}/>
							
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
								
							<TableBodyDataCell text={list.map((item, index) => {
          const randomColorClass = generateRandomColor();
          return (
            <button
              key={index}
              type="button"
              className={`${randomColorClass} inline-flex justify-center items-center rounded-xl p-2 text-xs mr-2 my-1 `}
            >
              {item}
            </button>
          );
        })}/>
							
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