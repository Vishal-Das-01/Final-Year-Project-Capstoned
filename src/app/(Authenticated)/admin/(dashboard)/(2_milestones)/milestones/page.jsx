import styles from "./MilestonesPage.module.css";
import MilestoneHeadingAndButton from "./_components/MilestoneHeadingAndButton/MilestoneHeadingAndButton";

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

				<div className={`${styles.tablePrimaryContainer} bg-white overflow-y-auto`}>

					<table className="w-full text-sm text-left text-gray-500 table-auto">

						<thead className="sticky top-0 z-10 text-xs text-white bg-blue-500 uppercase text-center ">

							<tr>
								<th scope="col" className="px-4 py-3">
									<span class="sr-only">Number</span>
								</th>
								<th scope="col" className={`px-4 py-3`}>
									Title
								</th>
								<th scope="col" className={`px-4 py-3`}>
									Description
								</th>
								<th scope="col" className={`px-4 py-3`}>
									Deadline
								</th>
								<th scope="col" className={`px-4 py-3`}>
									Percentage
								</th>
								<th scope="col" className={`px-4 py-3`}>
									Year
								</th>
							</tr>

						</thead>
						
						<tbody>

							<tr className="border-b dark:border-gray-700 hover:bg-gray-100">
								<td className="px-2 py-3 ">1</td>
								<td className="px-2 py-3 ">Hamza Akbar</td>
								<td className="px-2 py-3 ">22</td>
								<td className="px-2 py-3 ">Pakistan</td>
								<td className="px-2 py-3 ">22</td>
								<td className="px-2 py-3 ">Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>

							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
							<tr>
								<td>Hamza Akbar</td>
								<td>22</td>
								<td>Pakistan</td>
							</tr>
						</tbody>
					
					</table>
				
				</div>
				
			</div>

		</div>
	);
}


