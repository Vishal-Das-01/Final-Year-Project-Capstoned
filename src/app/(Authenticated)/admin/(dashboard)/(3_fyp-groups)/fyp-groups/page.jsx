import styles from "./FYPGroups.module.css";
import FYPGroupsHeadingAndButton from "./_components/FYPGroupsHeadingAndButton/FYPGroupsHeadingAndButton";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow";
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell";
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell";

export const metadata = {
	title: "Admin FYP Groups",
	description: "Capstoned FYP Groups | Final Year Project (FYP) Management Platform for College & University Students.",
}

export default function AdminDashboardFYPGroupsPage(props){

	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<FYPGroupsHeadingAndButton />

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

						<TableRow>

							<TableBodyDataCell text={'1'}/>
								
							<TableBodyDataCell text={'Hamza Akbar'}/>

							<TableBodyDataCell text={'This is dummy text. This is dummy text. This is dummy text. This is dummy text.'}/>
								
							<TableBodyDataCell text={'Pakistan'}/>
							
							<TableBodyDataCell text={'22'}/>
							
							<TableBodyDataCell text={'Pakistan'}/>

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
						
						</TableRow>
						
					</tbody>
					
				</ContentTable>
				
			</div>

		</div>
	);
}
