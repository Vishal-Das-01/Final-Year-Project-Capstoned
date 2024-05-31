import ContentCard from "./_components/ContentCard/ContentCard.jsx";
import WelcomeContent from "./_components/WelcomeContent/WelcomeContent.jsx";
import MilestonesContent from "./_components/MilestonesContent/MilestonesContent.jsx";
import DaysLeftContent from "./_components/DaysLeftContent/DaysLeftContent.jsx";
import FYPGroupsContent from "./_components/FYPGroupsContent/FYPGroupsContent.jsx";
import MessagesContent from "./_components/MessagesContent/MessagesContent.jsx";
import NotificationContent from "./_components/NotificationContent/NotificationContent.jsx";

import styles from "./AdminHomePage.module.css";

export const metadata = {
	title: "Admin Home",
	description: "Capstoned Admin Home | Final Year Project (FYP) Management Platform for College & University Students.",
}

export default function AdminDashboardHomePage(props){
	return (
		<div className={`${styles.pageContainer} w-full h-full flex flex-row items-center justify-center `}>
			
			<div className={`${styles.primaryContainer} overflow-auto flex flex-row `}>
				
				<div className={`${styles.left} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>

						<WelcomeContent 
							name={`Hamza`} 
							notificationCount={2}
							messageCount = {4}
						/>
					
					</ContentCard>

					<ContentCard>

						<NotificationContent 
							notifications={[]}
						/>
					
					</ContentCard>

				</div>

				<div className={`${styles.center} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>

						<MilestonesContent 
							deadlineDate={`Jan 15, 2024`}
							milestone={`Milestone 3`}
						/>

					</ContentCard>

					<ContentCard>

						<MessagesContent />

					</ContentCard>

				</div>

				<div className={`${styles.right} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>
						
						<DaysLeftContent 
							startDate={"2023-09-01"}
							endDate={"2024-05-31"}
							currentDate={`2024-03-23`}
						/>

					</ContentCard>

					<ContentCard>

						<FYPGroupsContent 
							fypGroupCount={24}
						/>
					
					</ContentCard>

				</div>

			</div>
		
		</div>
	);
}