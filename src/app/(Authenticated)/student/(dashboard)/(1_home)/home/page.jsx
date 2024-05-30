import ContentCard from "./_components/ContentCard/ContentCard.jsx";
import WelcomeContent from "./_components/WelcomeContent/WelcomeContent.jsx";
import MilestonesContent from "./_components/MilestonesContent/MilestonesContent.jsx";
import styles from "./StudentHomePage.module.css";
import ProjectContent from "./_components/ProjectContent/ProjectContent.jsx";
import ProposalsContent from "./_components/ProposalsContent/ProposalsContent.jsx";
import UpcomingMilestone from "./_components/UpcomingMilestone/UpcomingMilestone.jsx";
import FYPGroupsContent from "./_components/FYPGroupsContent/FYPGroupsContent.jsx";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes.js";
import { callAPI } from "@/utils/helpers/callAPI.js";
import { HttpStatusCode } from "axios";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes.js";
import { redirect } from "next/navigation.js";
import { cookies } from "next/headers.js";

export const metadata = {
  title: "Student Home",
  description:
    "Capstoned Student Home | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default async function MentorDashboardHomePage() {

  const dashboardDetails = await getDashboardDetails();

  return (
    <div
      className={`${styles.pageContainer} w-full h-full flex flex-row items-center justify-center `}
    >
      <div
        className={`${styles.primaryContainer} overflow-auto flex flex-row `}
      >
        <div
          className={`${styles.left} w-full h-full flex flex-col flex-1 items-center justify-evenly `}
        >
          <ContentCard>
            <WelcomeContent
              name={`${dashboardDetails.student.firstName} ${dashboardDetails.student.lastName}`}
              deadlineCount={2}
              meetingCount={4}
            />
          </ContentCard>

          <ContentCard>
            <ProjectContent project={dashboardDetails.group?.project}/>
          </ContentCard>
        </div>

        <div
          className={`${styles.center} w-full h-full flex flex-col flex-1 items-center justify-evenly `}
        >
          <ContentCard>
            <ProposalsContent proposals={dashboardDetails.group?.selectedProposal} />
          </ContentCard>


          <ContentCard>
            <MilestonesContent
              milestones={dashboardDetails.assignedMilestones}
            />
          </ContentCard>
        </div>

        <div
          className={`${styles.right} w-full h-full flex flex-col flex-1 items-center justify-evenly `}
        >
          <FYPGroupsContent studentID={dashboardDetails.student._id} group={dashboardDetails.group} />

          <UpcomingMilestone milestone={dashboardDetails.milestone} />
        </div>
      </div>
    </div>
  );
}

async function getDashboardDetails(){

  const accessToken = cookies().get('accessToken')?.value;
  const response = await callAPI(
    "GET",
    accessToken,
    `${BACKEND_ROUTES.getStudentDashboardDetails}`
  );
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData;
  } else if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}
