import ContentCard from "./_components/ContentCard/ContentCard.jsx";
import WelcomeContent from "./_components/WelcomeContent/WelcomeContent.jsx";
import MilestonesContent from "./_components/MilestonesContent/MilestonesContent.jsx";
import styles from "./StudentHomePage.module.css";
import ProjectContent from "./_components/ProjectContent/ProjectContent.jsx";
import ProposalsContent from "./_components/ProposalsContent/ProposalsContent.jsx";
import UpcomingMilestone from "./_components/UpcomingMilestone/UpcomingMilestone.jsx";
import FYPGroupsContent from "./_components/FYPGroupsContent/FYPGroupsContent.jsx";

export const metadata = {
	title: "Student Home",
	description: "Capstoned Student Home | Final Year Project (FYP) Management Platform for College & University Students.",
}

export default function MentorDashboardHomePage(){

	const milestone = [{
        assignmentNumber: 1,
        title: "Milestone 1",
        deadline: "2024-05-01T19:00:00.000Z",
	}]

	const group = {
		projectTitle:"Project Title",
		groupName:"Group Name",
		groupMembers:[{name:"Member 1"}, {name:"Member 2"}],
		groupLead:"Group Lead",
		role:"Group Member"
	}

	return (
		<div className={`${styles.pageContainer} w-full h-full flex flex-row items-center justify-center `}>
			
			<div className={`${styles.primaryContainer} overflow-auto flex flex-row `}>
				
				<div className={`${styles.left} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>

						<WelcomeContent 
							name={`Student Name`} 
							deadlineCount={2}
							meetingCount = {4}
						/>
					
					</ContentCard>

					
					<FYPGroupsContent group={group}/>
					
				</div>

				<div className={`${styles.center} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>

						<MilestonesContent 
							deadlineDate={`Jan 15, 2024`}
							milestone={`Milestone 3`}
						/>

					</ContentCard>

					<ContentCard>

						<ProjectContent />

					</ContentCard>

				</div>

				<div className={`${styles.right} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>

						<ProposalsContent proposals={[]}/>

					</ContentCard>

					<UpcomingMilestone milestone={milestone} />

				</div>

			</div>
		
		</div>
	);
}