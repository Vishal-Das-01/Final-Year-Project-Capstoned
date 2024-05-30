import ContentCard from "./_components/ContentCard/ContentCard.jsx";
import WelcomeContent from "./_components/WelcomeContent/WelcomeContent.jsx";
import FYPGroupsContent from "./_components/FYPGroupsContent/FYPGroupsContent.jsx";

import styles from "./MentorHomePage.module.css";
import ProposalsContent from "./_components/ProposalsContent/ProposalsContent.jsx";
import ProjectContent from "./_components/ProjectsContent/ProjectContent.jsx";
import UpcomingMilestone from "./_components/UpcomingMilestone/UpcomingMilestone.jsx";
import { cookies } from "next/headers.js";
import { callAPI } from "@/utils/helpers/callAPI.js";
import { HttpStatusCode } from "axios";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes.js";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes.js";

export const metadata = {
  title: "Mentor Home",
  description:
    "Capstoned Mentor Home | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default async function MentorDashboardHomePage() {

  const dashboardDetails = await getDashboardDetails()
  const projectsContent = dashboardDetails.data.groups.map(group => ({name: group.groupID.project.proposal.title, progress: group.groupID.project.progress}))
  console.log(dashboardDetails)

  return (
    <div  
      className={`${styles.primaryContainer} flex flex-col items-center justify-center`}
    >
      <div className="flex flex-row items-center justify-around w-full h-1/2">
        <ContentCard>
          <WelcomeContent name={dashboardDetails.data.firstName + ' ' + dashboardDetails.data.lastName} deadlineCount={2} meetingCount={4} />
        </ContentCard>

        <ProjectContent projects={projectsContent}/>
      </div>

      <div className="flex flex-row items-center justify-around w-full h-1/2">
        <FYPGroupsContent groups={dashboardDetails.data.groups}/>

        <ContentCard>
          <ProposalsContent proposals={dashboardDetails.data.myProposals}/>
        </ContentCard>

        <UpcomingMilestone milestone={dashboardDetails.milestone}/>
      </div>
    </div>
  );
}

async function getDashboardDetails(){
  var year = new Date().getFullYear();
  const month = new Date().getMonth();
  
  if(month > 6){
    year = year + 1;
  }

  const accessToken = cookies().get('accessToken')?.value;
  const response = await callAPI(
    "GET",
    accessToken,
    `${BACKEND_ROUTES.getMentorDashboardDetails}?year=${year}`
  );
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData;
  } else if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}