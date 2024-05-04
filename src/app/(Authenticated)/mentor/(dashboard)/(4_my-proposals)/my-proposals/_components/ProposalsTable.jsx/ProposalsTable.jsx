import React from "react";
import ProposalRow from "./_components/ProposalRow/ProposalRow";
import styles from "./ProposalsTable.module.css";
import { cookies } from "next/headers";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { redirect } from "next/dist/server/api-utils";
import { callAPI } from "@/utils/helpers/callAPI";
import NotFound from "./_components/NotFound/NotFound";

async function ProposalsTable() {
  const proposals = [];
  console.log(proposals);

  return (
    <div class="bg-white dark:bg-gray-800 border-2 m-5 relative shadow-lg rounded-xl overflow-hidden">
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
                Selected By
              </th>
              <th scope="col" class="px-4 py-3">
                Mentorship
              </th>
              <th scope="col" class="px-4 py-3">
                Proposal Doc
              </th>
              <th scope="col" class="px-4 py-3">
                <span class="sr-only">Actions</span>
              </th>
            </tr>
          </thead>
          <tbody>
            {proposals.length === 0 && (<NotFound/>)}
            {proposals.length !==0 &&  proposals.map((proposal) => (
              <ProposalRow
                key={proposal._id}
                title={"FYP Management System"}
                description={
                  "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla pariatur."
                }
                status={true}
                selectedBy={"Free Riders"}
                mentorship={true}
                active={false}
              />
            ))}
            {/* <ProposalRow
              title={"FYP Management System"}
              description={
                "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat.Duis aute irure dolor in reprehenderit in voluptate velitesse cillum dolore eu fugiat nulla pariatur."
              }
              status={true}
              selectedBy={"Free Riders"}
              mentorship={true}
              active={false}
            /> */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default ProposalsTable;

// async function getProposals() {
//   const accessToken = cookies().get("accessToken")?.value;
//   const response = await callAPI(
//     "GET",
//     accessToken,
//     BACKEND_ROUTES.getProposalsMentor
//   );
//   if (response.status === HttpStatusCode.Ok) {
//     const responseData = await response.json();
//     return responseData;
//   }
//   if (response.status === HttpStatusCode.Unauthorized) {
//     redirect(FRONTEND_ROUTES.login_page);
//   }
// }
