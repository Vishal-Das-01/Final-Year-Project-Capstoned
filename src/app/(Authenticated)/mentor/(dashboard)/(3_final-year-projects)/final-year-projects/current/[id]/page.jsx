import React from "react";
import BackButton from "./_components/BackButton/BackButton";
import MilestoneTab from "./_components/MilestoneTab/MilestoneTab";
import ResourceButton from "./_components/ResourceButton/ResourceButton";
import MarkSection from "./_components/MarkSection/MarkSection";
import MainMarkSection from "./_components/MainMarkSection/MainMarkSection";
import { cookies } from "next/headers";
import { callAPI } from "@/utils/helpers/callAPI";
import { HttpStatusCode } from "axios";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { redirect } from "next/dist/server/api-utils";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";

async function ProjectPage({ params: { id } }) {
  const projectDetails = await getProjectDetails(id);
  console.log(projectDetails);

  return (
    <div className="m-5 flex flex-col space-y-7">
      <BackButton />
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-semibold">
          {projectDetails.project.proposal.title} -{" "}
          {projectDetails.project.group.name}
        </h1>
        <h2 className="font-light">Fall {projectDetails.project.year}</h2>
      </div>
      <div className="grid grid-cols-4 gap-y-5">
        <h2 className="font-semibold">Your Role:</h2>
        <h2 className="col-span-3">{projectDetails.role}</h2>
        <h2 className="font-semibold">Proposed By:</h2>
        <h2 className="col-span-3">{projectDetails.proposedBy}</h2>
        <h2 className="font-semibold">Progress:</h2>
        <h2 className="col-span-3">{projectDetails.project.progress + "%"}</h2>
        <h2 className="font-semibold">Project Description:</h2>
        <p className="col-span-3">
          {projectDetails.project.proposal.description}
        </p>
        <h2 className="font-semibold">Proposal Doc:</h2>
        <div className="col-span-3">
          <ResourceButton
            name={projectDetails.project.proposal.title}
            link={projectDetails.project.proposal.proposalDoc.file}
          />
        </div>
        <h2 className="font-semibold">Marks:</h2>
        <div className="col-span-3">
          <MainMarkSection isMarked={true} />
        </div>
      </div>
      <MilestoneTab isMarked={true} />
      <MilestoneTab isMarked={false} />
      <MilestoneTab isMarked={false} />
    </div>
  );
}

export default ProjectPage;

async function getProjectDetails(id) {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI(
    "GET",
    accessToken,
    `${BACKEND_ROUTES.getMentorProjectDetails}/${id}`
  );
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData.data;
  } else if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}
