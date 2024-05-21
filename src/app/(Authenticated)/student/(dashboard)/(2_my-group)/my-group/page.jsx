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
import { IoArrowForward } from "react-icons/io5";
import Link from "next/link";

export const metadata = {
  title: "Final Year Groups: Group Details",
  description:
    "Capstoned Student Group Details | Final Year Project (FYP) Management Platform for College & University Students.",
};

async function GroupDetails() {
  const groupDetails = {
    data: {
      name: "Group 1",
      year: 2024,
      lead: {
        firstName: "Lead",
        lastName: "Lead",
      },
      supervisor: {
        firstName: "Supervisor",
        lastName: "Supervisor",
      },
      mentors: [
        {
          firstName: "Mentor",
          lastName: "Mentor",
        },
        {
          firstName: "Mentor",
          lastName: "Mentor",
        },
      ],
      members: [
        {
          firstName: "Member",
          lastName: "Member",
        },
        {
          firstName: "Member",
          lastName: "Member",
        },
      ],
      project: null,
    },
    role: "Lead",
  };
  const id = 5;

  return (
    <div
      className={`${styles.contentCardTitleContainer} ${styles.container} p-3 overflow-auto my-9 mx-5 flex flex-col rounded-xl font-montserrat`}
    >
      <div className="m-5 flex flex-col space-y-7">
        <div className="flex flex-row justify-end gap-1 items-center">
          <div></div>
          <HelpingButton />
          <div>
            <Link href={"/student/my-group/request-members"}>
            <button
              type="button"
              className="flex flex-row p-1 items-center justify-center w-full h-full font-montserrat font-semibold rounded-lg text-sm tracking-widest text-white bg-black border-4 border-black hover:bg-white hover:border-4 hover:border-black hover:text-black"
              >
              Request Members
              <IoArrowForward className="mr-2 w-4 h-4" />
            </button>
              </Link>
          </div>
        </div>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold">{groupDetails.data.name}</h1>
          <h2 className="font-light">Fall {groupDetails.data.year}</h2>
        </div>
        <div className="grid grid-cols-4 gap-y-5">
          <h2 className="font-semibold">Your Role:</h2>
          <h2 className="col-span-3">{groupDetails.role}</h2>
          <h2 className="font-semibold">Lead:</h2>
          <h2 className="col-span-3">
            {groupDetails.data.lead.firstName} {groupDetails.data.lead.lastName}
          </h2>
          <h2 className="font-semibold">Supervisor:</h2>
          <h2 className="col-span-3">
            {groupDetails.data.supervisor.firstName}{" "}
            {groupDetails.data.supervisor.lastName}
          </h2>
          <h2 className="font-semibold">Mentors:</h2>
          <div className="flex flex-col col-span-3">
            {groupDetails.data.mentors.map((mentor, index) => (
              <h2 key={index} className="col-span-3">
                {mentor.firstName} {mentor.lastName}
              </h2>
            ))}
          </div>
          <h2 className="font-semibold">Group Members:</h2>
          <div className="flex flex-col col-span-3">
            {groupDetails.data.members.map((member, index) => (
              <h2 key={index} className="col-span-3">
                {member.firstName} {member.lastName}
              </h2>
            ))}
          </div>
          <h2 className="font-semibold">Project Name:</h2>
          <h2 className="col-span-3">
            {groupDetails.data.project
              ? ""
              : "Project hasn't been confirmed yet."}
          </h2>
          {!groupDetails.data.project && (
            <>
              <h2 className="col-span-4 mt-5 text-center font-semibold">
                Proposals Approvals Request
              </h2>
              <div className="col-span-4">
                {/*<ProposalsTable groupID={id} role={groupDetails.role}/> */}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default GroupDetails;

async function GetGroupDetails(id) {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI(
    "GET",
    accessToken,
    `${BACKEND_ROUTES.getMentorGroupDetails}/${id}`
  );
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData;
  } else if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}
