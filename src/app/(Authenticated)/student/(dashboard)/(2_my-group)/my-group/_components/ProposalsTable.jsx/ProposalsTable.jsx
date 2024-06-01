import React from "react";
import ProposalRow from "./_components/ProposalRow/ProposalRow";
import styles from "./ProposalsTable.module.css";
import { cookies } from "next/headers";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { callAPI } from "@/utils/helpers/callAPI";
import NotFound from "./_components/NotFound/NotFound";
import { redirect } from "next/navigation";

async function ProposalsTable({groupID, role}) {
  const proposals = await getSelectedProposals(groupID);
  console.log(proposals)
  
  return (
    <div class="bg-white dark:bg-gray-800 border-2 relative shadow-lg rounded-xl overflow-hidden">
      <div class={`overflow-y-auto ${styles.container}`}>
        <table class="w-full text-sm text-left text-gray-500 table-auto">
          <thead class="sticky top-0 z-10 text-xs text-white bg-blue-500 uppercase text-center ">
            <tr>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
              <th scope="col" class="px-4 py-3 text-left">
                Proposal Title
              </th>
              <th scope="col" class="px-4 py-3">
                Status
              </th>
              <th scope="col" class="px-4 py-3">
                Proposal Doc
              </th>
              <th scope="col" class="px-4 py-3">
                Send for Approval
              </th>
              {/* <th scope="col" class="px-4 py-3">
                Approve
              </th> */}
            </tr>
          </thead>
          <tbody>
            {proposals.length === 0 && <NotFound />}
            {proposals.length !== 0 &&
              proposals.map((item) => (
                <ProposalRow
                  key={item.proposal._id}
                  proposalID={item.proposal._id}
                  title={item.proposal.title}
                  description={item.proposal.description}
                  createdAt={item.proposal.createdAt}
                  updatedAt={item.proposal.updatedAt}
                  proposalDoc={item.proposal.proposalDoc}
                  industries={item.proposal.industries}
                  status={item.status}
                  role={role}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProposalsTable;

async function getSelectedProposals(groupID) {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI(
    "GET",
    accessToken,
    `${BACKEND_ROUTES.getGroupSelectedProposal}/${groupID}`
  );
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData.data.selectedProposal;
  } else if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}