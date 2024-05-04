import styles from "./AnnouncementsPage.module.css";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow"; 
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell"; 
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell"; 
import AnnouncementsHeadingAndButton from "./_components/AnnouncementsHeadingAndButton/AnnouncementsHeadingAndButton";

export const metadata = {
	title: "Admin Announcements Management",
	description: "Capstoned Admin Announcements Management | Final Year Project (FYP) Management Platform for College & University Students.",
}

export default function AdminDashboardAnnouncementsPage(props){
	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<AnnouncementsHeadingAndButton />

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

						<TableRow>

							<TableBodyDataCell text={'1'}/>
								
							<TableBodyDataCell text={'Hamza Akbar'}/>

							<TableBodyDataCell text={'This is dummy text. This is dummy text. This is dummy text. This is dummy text.'}/>
								
							<TableBodyDataCell text={'Pakistan'}/>
							
							<TableBodyDataCell text={'22'}/>
							
							<TableBodyDataCell text={'Pakistan'}/>

							<TableBodyDataCell text={'True'}/>

							<TableBodyDataCell text={'True'}/>
							
						</TableRow>

						<TableRow>

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

		</div>
	);
}