import styles from "./MilestonesPage.module.css";
import MilestoneHeadingAndButton from "./_components/MilestoneHeadingAndButton/MilestoneHeadingAndButton";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow";
import TableHeadDataCell from "../../_components/TableHeadDataCell/TableHeadDataCell";
import TableBodyDataCell from "../../_components/TableBodyDataCell/TableBodyDataCell";

export const metadata = {
	title: "Admin Milestones",
	description: "Capstoned Milestones | Final Year Project (FYP) Management Platform for College & University Students.",
}

export default function AdminDashboardMilestonesPage(props){

	function createMilestoneHandler(){
		console.log("Create Milestone");
	}

	return (
		<div className={`${styles.primaryContainer} flex flex-row items-center justify-center w-full h-full`}>
			
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-evenly bg-white`}>

				<MilestoneHeadingAndButton />

				<ContentTable>

					<TableHead>

						<TableHeadDataCell isNumberCell={true} text={`Number`}/>

						<TableHeadDataCell isNumberCell={false} text={`Title`}/>

						<TableHeadDataCell isNumberCell={false} text={`Description`}/>

						<TableHeadDataCell isNumberCell={false} text={`Deadline`}/>

						<TableHeadDataCell isNumberCell={false} text={`Percentage`}/>

						<TableHeadDataCell isNumberCell={false} text={`Year`}/>

					</TableHead>
					
					<tbody>

						<TableRow>

							<TableBodyDataCell text={'1'}/>
							
							<TableBodyDataCell text={'Hamza Akbar'}/>

							<TableBodyDataCell text={'22'}/>
							
							<TableBodyDataCell text={'Pakistan'}/>
							
							<TableBodyDataCell text={'22'}/>
							
							<TableBodyDataCell text={'Pakistan'}/>
						
						</TableRow>

						<TableRow>

							<TableBodyDataCell text={'2'}/>
							
							<TableBodyDataCell text={'Hamza Akbar'}/>

							<TableBodyDataCell text={'22'}/>
							
							<TableBodyDataCell text={'Pakistan'}/>
							
							<TableBodyDataCell text={'22'}/>
							
							<TableBodyDataCell text={'Pakistan'}/>
						
						</TableRow>
						
					</tbody>
					
				</ContentTable>
				
			</div>

		</div>
	);
}


