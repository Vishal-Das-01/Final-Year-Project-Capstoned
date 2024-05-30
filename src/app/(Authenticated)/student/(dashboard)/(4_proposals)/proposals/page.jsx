import React from "react";
import styles from "./Proposals.module.css";
import ProposalsTable from "./_components/ProposalsTable.jsx/ProposalsTable";

export const metadata = {
  title: "Proposals",
  description:
    "Capstoned Student Proposals | Final Year Project (FYP) Management Platform for College & University Students.",
};

function ProposalsPage(context) {
  return (
    <div
      className={`${styles.contentCardTitleContainer} p-3 my-9 mx-5 flex flex-col rounded-xl font-montserrat`}
    >
      <div className="flex flex-row items-center justify-start w-auto h-8 py-2 mr-5">
        <h1 className={`${styles.contentHeading} font-semibold text-black`}>
          Proposals
        </h1>
        <div
          className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
        />

      </div>

      <div className={`${styles.container} m-4`}>
        <ProposalsTable page={parseInt(context.searchParams.page)}/>
      </div>

    </div>
  );
}

export default ProposalsPage;
