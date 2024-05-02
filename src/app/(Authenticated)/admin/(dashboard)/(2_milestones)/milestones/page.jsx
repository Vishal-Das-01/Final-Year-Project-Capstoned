import styles from "./MilestonesPage.module.css";
import MilestoneHeadingAndButton from "./_components/MilestoneHeadingAndButton/MilestoneHeadingAndButton";
import ContentTable from "../../_components/ContentTable/ContentTable";
import TableHead from "../../_components/TableHead/TableHead";
import TableRow from "../../_components/TableRow/TableRow";

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

						<th scope="col" className={`px-4 py-3 text-left`}>
							<span class="sr-only">Number</span>
						</th>

						<th scope="col" className={`px-4 py-3 text-left`}>
							Title
						</th>

						<th scope="col" className={`px-4 py-3 text-left`}>
							Description
						</th>

						<th scope="col" className={`px-4 py-3 text-left`}>
							Deadline
						</th>

						<th scope="col" className={`px-4 py-3 text-left`}>
							Percentage
						</th>

						<th scope="col" className={`px-4 py-3 text-left`}>
							Year
						</th>

					</TableHead>
					
					<tbody>

						<TableRow>

							<td className="px-4 py-3 text-left">
								1
							</td>
							
							<td className="px-4 py-3 text-left">
								Hamza Akbar
							</td>

							<td className="px-4 py-3 text-left">
								22
							</td>
							
							<td className="px-4 py-3 text-left">
								Pakistan
							</td>
							
							<td className="px-4 py-3 text-left">
								22
							</td>
							
							<td className="px-4 py-3 text-left">
								Pakistan
							</td>
						
						</TableRow>

						<TableRow>

							<td className="px-4 py-3 text-left">
								1
							</td>
							
							<td className="px-4 py-3 text-left">
								Hamza Akbar
							</td>

							<td className="px-4 py-3 text-left">
								22
							</td>
							
							<td className="px-4 py-3 text-left">
								Pakistan
							</td>
							
							<td className="px-4 py-3 text-left">
								22
							</td>
							
							<td className="px-4 py-3 text-left">
								Pakistan
							</td>
						
						</TableRow>
						
					</tbody>
					
				</ContentTable>
				
			</div>

		</div>
	);
}


