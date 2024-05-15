import React from "react";
import ProposalRow from "./_components/ProposalRow/ProposalRow";
import styles from "./ProposalsTable.module.css";
import { cookies } from "next/headers";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { redirect } from "next/dist/server/api-utils";
import { callAPI } from "@/utils/helpers/callAPI";
import NotFound from "./_components/NotFound/NotFound";

async function ProposalsTable({groupID, role}) {
  const proposals = [
    {
      _id: "1",
      title: "Title",
      description: "Description",
      status: false,
      selectedBy: "Selected By",
      mentorship: true,
      proposalDoc: "Proposal Doc",
      createdAt: "2022-01-01",
      updatedAt: "2022-01-01",
    },
  ];

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
                Proposal Doc
              </th>
              <th scope="col" class="px-4 py-3">
                Reject
              </th>
              <th scope="col" class="px-4 py-3">
                Approve
              </th>
            </tr>
          </thead>
          <tbody>
            {proposals.length === 0 && <NotFound />}
            {proposals.length !== 0 &&
              proposals.map((proposal) => (
                <ProposalRow
                  key={proposal._id}
                  proposalID={proposal._id}
                  title={proposal.title}
                  description={proposal.description}
                  status={!proposal.edit}
                  selectedBy={proposal.selectedBy}
                  mentorship={proposal.mentorship}
                  active={proposal.available}
                  createdAt={proposal.createdAt}
                  updatedAt={proposal.updatedAt}
                  proposalDoc={proposal.proposalDoc}
                />
              ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProposalsTable;
