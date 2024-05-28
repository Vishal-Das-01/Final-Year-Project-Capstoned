import React from "react";
import ProposalRow from "./_components/ProposalRow/ProposalRow";
import styles from "./ProposalsTable.module.css";
import { cookies } from "next/headers";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import toast from "react-hot-toast";
import { redirect } from "next/navigation";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { PaginationComponent } from "./_components/PaginationComponent/PaginationComponent";

async function ProposalsTable({ page }) {
  page = page || 1;

  const allProposals = await getProposals(page);
  const groupID = allProposals.group;

  return (
    <div className="bg-white dark:bg-gray-800 border-2 m-5 relative shadow-lg rounded-xl overflow-hidden">
      <div className={`overflow-y-auto ${styles.container}`}>
        <table className="w-full text-sm text-left text-gray-500 table-auto">
          <thead className="sticky top-0 z-10 text-xs text-white bg-blue-500 uppercase text-center ">
            <tr>
              <th scope="col" class="px-4 py-3">
                <span className="sr-only">Actions</span>
              </th>
              <th scope="col" class="px-4 py-3 text-left">
                Proposal Title
              </th>
              <th scope="col" class="px-4 py-3">
                Role
              </th>
              <th scope="col" class="px-4 py-3">
                Proposed By
              </th>
              <th scope="col" class="px-4 py-3">
                Mentorship
              </th>
              <th scope="col" class="px-4 py-3">
                Proposal Doc
              </th>
              <th scope="col" class="px-4 py-3">
                Request
              </th>
            </tr>
          </thead>
          <div className="font-semibold absolute w-full bottom-0 z-10 text-xs text-white bg-blue-500 flex flex-row items-center justify-end pr-1.5 pb-1.5">
            <PaginationComponent
              totalPages={allProposals.totalPages}
              page={allProposals.page}
            />
          </div>
          <tbody>
            {allProposals.proposals.map((proposal, index) => (
              <ProposalRow
                key={index}
                groupID={groupID}  
                proposalID={proposal._id}
                title={proposal.title}
                description={proposal.description}
                edit={proposal.edit}
                industries={proposal.industries}
                proposedBy={proposal.proposedBy}
                mentorship={proposal.mentorship}
                proposalDoc={proposal.proposalDoc}
                createdAt={proposal.createdAt}
                updatedAt={proposal.updatedAt}
              />
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProposalsTable;

async function getProposals(page) {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI(
    "GET",
    accessToken,
    `${BACKEND_ROUTES.studentGetAllProposals}?page=${page}`
  );
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData.data;
  } else if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}
