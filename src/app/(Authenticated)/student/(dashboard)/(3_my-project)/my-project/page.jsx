import React from "react";
import MilestoneTab from "./_components/MilestoneTab/MilestoneTab";
import ResourceButton from "./_components/ResourceButton/ResourceButton";
import MarkSection from "./_components/MarkSection/MarkSection";
import styles from "./MyProject.module.css";
import MainMarkSection from "./_components/MainMarkSection/MainMarkSection";
import { cookies } from "next/headers";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { redirect } from "next/dist/server/api-utils";

export const metadata = {
  title: "Final Year Project",
  description: "Capstoned Student Final Year Project | Final Year Project (FYP) Management Platform for College & University Students.",
};

async function ProjectPage() {
  const projectDetails = await getProjectDetails();

  return (
    <div
      className={`${styles.contentCardTitleContainer} p-3 my-9 mx-5 flex flex-col rounded-xl font-montserrat`}
    >
      <div className="m-5 flex flex-col space-y-7">
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold">
            {projectDetails.project.proposal.title} - {projectDetails.group.name}
          </h1>
          <h2 className="font-light">Fall {projectDetails.project.year}</h2>
        </div>
        <div className="grid grid-cols-4 gap-y-5">
          <h2 className="font-semibold">Your Role:</h2>
          <h2 className="col-span-3">{projectDetails.role}</h2>
          <h2 className="font-semibold">Proposed By:</h2>
          <h2 className="col-span-3">{projectDetails.project.proposal.proposer === "Group" ? "Proposal was created by your own group" : `${projectDetails.project.proposal.proposedBy.firstName} ${projectDetails.project.proposal.proposedBy.lastName}`}</h2>
          <h2 className="font-semibold">Supervisor:</h2>
          <h2 className="col-span-3">{projectDetails.group.supervisor.firstName} {projectDetails.group.supervisor.lastName}</h2>
          <h2 className="font-semibold">Progress:</h2>
          <h2 className="col-span-3">{projectDetails.project.progress}</h2>
          <h2 className="font-semibold">Project Description:</h2>
          <p className="col-span-3">{projectDetails.project.proposal.description}</p>
          <h2 className="font-semibold">Proposal Doc:</h2>
          <div className="col-span-3">
            <ResourceButton
              name={projectDetails.project.proposal.title}
              link={projectDetails.project.proposal.proposalDoc.file}
            />
          </div>
          {/* <h2 className="font-semibold">Marks:</h2>
          <div className="col-span-3">
            <MainMarkSection isMarked={true} />
          </div> */}
        </div>
        {projectDetails.project.milestones.map((assignedMilestone, index) => (
          <MilestoneTab
            key={index}
            role={projectDetails.role}
            marked={assignedMilestone.marked}
            milestoneNumber={assignedMilestone.milestoneID.assignmentNumber}
            assignedMilestoneID={assignedMilestone._id}
            projectID={projectDetails.project._id}
          />
        ))}
      </div>
    </div>
  );
}

export default ProjectPage;

async function getProjectDetails() {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI("GET", accessToken, BACKEND_ROUTES.getStudentProjects);
  if(response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData;
  }
  else if (response.status === HttpStatusCode.Unauthorized){
    redirect(FRONTEND_ROUTES.login_page);
  }
}