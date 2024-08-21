import React from "react";
import ProposalsTable from "./_components/ProposalsTable.jsx/ProposalsTable";
import { cookies } from "next/headers";
import { HttpStatusCode } from "axios";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { redirect } from "next/navigation";
import { callAPI } from "@/utils/helpers/callAPI";
import styles from "./CurrentProjects.module.css";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import HelpingButton from "./_components/HelpingButton/HelpingButton";
import { IoArrowForward, IoArrowUp } from "react-icons/io5";
import Link from "next/link";
import PredictiveSuccessAnalysisButton from "./_components/AutoProjectAssessment/UniqueScoreButton";

export const metadata = {
  title: "Final Year Groups: Group Details",
  description:
    "Capstoned Student Group Details | Final Year Project (FYP) Management Platform for College & University Students.",
};

async function GroupDetails() {
  const profile = await getProfile()
  const group = await getGroup(profile.student.group)
  const project = await getProjectDetails()

  let role;
  if (group && group.lead === profile._id)
    role = "Lead";
  else
    role = "Member";

  return (
    <div
      className={`${styles.contentCardTitleContainer} ${styles.container} p-3 my-9 mx-5 flex flex-col rounded-xl font-montserrat`}
    >
      <div className="flex flex-col m-5 space-y-7">
        <div className="flex flex-row items-center justify-end gap-1">
          <div></div><Link href={"/student/my-group/proposals"}>
            <button
              type="button"
              className="flex flex-row items-center justify-center w-full h-full p-1 text-sm font-semibold tracking-widest text-white bg-black border-4 border-black rounded-lg font-montserrat hover:bg-white hover:border-4 hover:border-black hover:text-black"
              >
              <IoArrowUp className="w-4 h-4 mr-2" />
              Our Proposals
            </button>
              </Link>
          <HelpingButton group={profile.group}/>
          <PredictiveSuccessAnalysisButton 
          number_of_students={0}
          project_description={project?.project.proposal.description}
          project_title={project?.project.proposal.title}
          project_document_URL={project?.project.proposal.proposalDoc.file}
          project_document_type={"PDF"}
          project_skills={["string"]}
          student_academic_performance={["string"]}
          students_skills={["string"]}
          />
          <div>
            {/* <Link href={"/student/my-group/request-members"}>
            <button
              type="button"
              className="flex flex-row items-center justify-center w-full h-full p-1 text-sm font-semibold tracking-widest text-white bg-black border-4 border-black rounded-lg font-montserrat hover:bg-white hover:border-4 hover:border-black hover:text-black"
              >
              Request Members
              <IoArrowForward className="w-4 h-4 mr-2" />
            </button>
              </Link> */}
          </div>
        </div>
        <div className="flex flex-row items-center justify-between">
          <h1 className="text-3xl font-semibold">{group && group.data.name}</h1>
          <h2 className="font-light">Fall {group && group.data.year}</h2>
        </div>
        <div className="grid grid-cols-4 gap-y-5">
          <h2 className="font-semibold">Your Role:</h2>
          <h2 className="col-span-3">{role}</h2>
          <h2 className="font-semibold">Lead:</h2>
          <h2 className="col-span-3">
            {group && group.data.lead.firstName} {group && group.data.lead.lastName}
          </h2>
          <h2 className="font-semibold">Supervisor:</h2>
          <h2 className="col-span-3">
            {group && group.data.supervisor?.firstName}{" "}
            {group && group.data.supervisor?.lastName}
          </h2>
          <h2 className="font-semibold">Mentors:</h2>
          <div className="flex flex-col col-span-3">
            {group && group.data.mentors.map((mentor, index) => (
              <h2 key={index} className="col-span-3">
                {mentor.firstName} {mentor.lastName}
              </h2>
            ))}
          </div>
          <h2 className="font-semibold">Group Members:</h2>
          <div className="flex flex-col col-span-3">
            {group && group.data.members.map((member, index) => (
              <h2 key={index} className="col-span-3">
                {member.firstName} {member.lastName}
              </h2>
            ))}
          </div>
          <h2 className="font-semibold">Project Name:</h2>
          <h2 className="col-span-3">
            {group && group.data.project
              ? project.project.proposal.title
              : "Project hasn't been confirmed yet."}
          </h2>
          {group && !group.data.project && (
            <>
              <h2 className="col-span-4 mt-5 font-semibold text-center">
                Proposals Approvals Request
              </h2>
              <div className="col-span-4">
                <ProposalsTable groupID={profile.student.group} role={role? role :"No Role"}/>
              </div>
            </>
          )}
          {group && group.data.project && (
            <>
              <h2 className="col-span-4 mt-5 font-semibold text-center">
                Selected Proposal
              </h2>
              <div className="col-span-4">
                <ProposalsTable groupID={profile.student.group} role={project.role}/>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupDetails;

async function getProfile() {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI("GET", accessToken, BACKEND_ROUTES.getProfile);
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData;
  }
  if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }

}

async function getGroup(groupID) {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI("GET", accessToken, BACKEND_ROUTES.getGroupDetails +"?id=" + groupID);
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData;
  }
  if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}

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