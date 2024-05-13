import React from "react";
import BackButton from "./_components/BackButton/BackButton";
import ProposalsTable from "./_components/ProposalsTable.jsx/ProposalsTable";

function GroupDetails() {
  return (
    <div className="m-5 flex flex-col space-y-7">
      <BackButton />
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-semibold">The User Friendlies</h1>
        <h2 className="font-light">Fall 2024</h2>
      </div>
      <div className="grid grid-cols-4 gap-y-5">
        <h2 className="font-semibold">Your Role:</h2>
        <h2 className="col-span-3">Supervisor/Mentor</h2>
        <h2 className="font-semibold">Supervisor:</h2>
        <h2 className="col-span-3">Dr Muhammad Saeed</h2>
        <h2 className="font-semibold">Mentors:</h2>
        <div className="flex flex-col col-span-3">
          <h2 className="col-span-3">30%</h2>
          <h2 className="col-span-3">30%</h2>
          <h2 className="col-span-3">30%</h2>
        </div>
        <h2 className="font-semibold">Group Members:</h2>
        <div className="flex flex-col col-span-3">
          <h2 className="col-span-3">30%</h2>
          <h2 className="col-span-3">30%</h2>
          <h2 className="col-span-3">30%</h2>
        </div>
        <h2 className="font-semibold">Project Name:</h2>
        <h2 className="col-span-3">{"Project hasn't been confirmed yet."}</h2>
        <h2 className="col-span-4 mt-5 text-center font-semibold">
          Proposals Approvals Request
        </h2>
        <div className="col-span-4">
          <ProposalsTable />
        </div>
      </div>
    </div>
  );
}

export default GroupDetails;
