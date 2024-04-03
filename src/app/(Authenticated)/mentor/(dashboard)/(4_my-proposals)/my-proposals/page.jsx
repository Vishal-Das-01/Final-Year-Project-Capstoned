import React from "react";
import styles from "./MyProposals.module.css";
import ProposalsTable from "./_components/ProposalsTable.jsx/ProposalsTable";
import HelpingButton from "./_components/HelpingButton/HelpingButton";

export const metadata = {
    title: "Mentor Proposals",
    description: "Capstoned Mentor Proposals | Final Year Project (FYP) Management Platform for College & University Students.",
};

function MyProposals() {
  return (
    <div
      className={`${styles.contentCardTitleContainer} p-3 overflow-auto my-9 mx-5 flex flex-col rounded-xl font-montserrat`}
    >
      <div className="flex flex-row items-center py-2 mr-5 w-auto justify-between">
        <div className="flex flex-row items-center">
          <h1
            className={`${styles.contentHeading} font-semibold text-black`}
          >
            My Proposals
          </h1>
          <div
            className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
          />
        </div>
        <div>
          <HelpingButton />
        </div>
      </div>

      <ProposalsTable />

    </div>
  );
}

export default MyProposals;
