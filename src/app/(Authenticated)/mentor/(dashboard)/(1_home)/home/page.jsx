import ContentCard from "./_components/ContentCard/ContentCard.jsx";
import WelcomeContent from "./_components/WelcomeContent/WelcomeContent.jsx";
import MilestonesContent from "./_components/MilestonesContent/MilestonesContent.jsx";
import MeetingsContent from "./_components/MeetingsContent/MeetingsContent.jsx";
import FYPGroupsContent from "./_components/FYPGroupsContent/FYPGroupsContent.jsx";
import CalendarContent from "./_components/CalendarContent/CalendarContent.jsx";

import styles from "./MentorHomePage.module.css";
import ProposalsContent from "./_components/ProposalsContent/ProposalsContent.jsx";
import ProjectContent from "./_components/ProjectsContent/ProjectContent.jsx";

export const metadata = {
  title: "Mentor Home",
  description:
    "Capstoned Mentor Home | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function MentorDashboardHomePage() {
  return (
    <div
      className={`${styles.primaryContainer} flex flex-col items-center justify-center`}
    >
      <div className="w-full h-1/2 flex flex-row items-center justify-around">
        <ContentCard>
          <WelcomeContent name={`Mentor`} deadlineCount={2} meetingCount={4} />
        </ContentCard>

        <ProjectContent />
      </div>

      <div className="w-full h-1/2 flex flex-row items-center justify-around">
        <ContentCard>
          <FYPGroupsContent />
        </ContentCard>

        <ContentCard>
          <ProposalsContent />
        </ContentCard>

        <ContentCard>
          <MilestonesContent
            deadlineDate={`Jan 15, 2024`}
            milestone={`Milestone 3`}
          />
        </ContentCard>
      </div>
    </div>
  );
}
