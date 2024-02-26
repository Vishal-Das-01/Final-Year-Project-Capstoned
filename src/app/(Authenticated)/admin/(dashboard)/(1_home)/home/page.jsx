import ContentCard from "./_components/ContentCard/ContentCard.jsx";
import WelcomeContent from "./_components/WelcomeContent/WelcomeContent.jsx";
import MilestonesContent from "./_components/MilestonesContent/MilestonesContent.jsx";
import MeetingsContent from "./_components/MeetingsContent/MeetingsContent.jsx";
import FYPGroupsContent from "./_components/FYPGroupsContent/FYPGroupsContent.jsx";

import styles from "./AdminHomePage.module.css";

export const metadata = {
	title: "Admin Home",
	description: "Capstoned Admin Home | Final Year Project (FYP) Management Platform for College & University Students.",
}

export default function AdminDashboardHomePage(props){
	return (
		<div className={`${styles.pageContainer} w-full h-full flex flex-row items-center justify-center border-2 border-green-500`}>
			
			<div className={`${styles.primaryContainer} overflow-auto flex flex-row `}>
				
				<div className={`${styles.left} w-full h-full flex flex-col flex-1 items-center justify-evenly border-2 border-pink-500`}>

					<ContentCard>

						<WelcomeContent 
							name={`Hamza`} 
							message={`You have 2 deadlines coming up.`}
						/>
					
					</ContentCard>

					<ContentCard>

						<MeetingsContent 
							location={`Faculty Lounge`} 
							meetingDate={`Jan 12, 2024`}
						/>
					
					</ContentCard>

				</div>

				<div className={`${styles.right} w-full h-full flex flex-col flex-1 items-center justify-evenly border-2 border-yellow-500`}>

					<ContentCard>

						<MilestonesContent 
							deadlineDate={`Jan 15, 2024`}
							milestone={`Milestone 3`}
						/>
					
					</ContentCard>

					<ContentCard>
						<FYPGroupsContent />
					</ContentCard>

				</div>

			</div>
		
		</div>
	);
}