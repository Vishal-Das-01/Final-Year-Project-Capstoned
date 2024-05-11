"use client";
import React from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
import ResourceButton from "../ResourceButton/ResourceButton";
import MarkSection from "../MarkSection/MarkSection";

function MilestoneTab({isMarked}) {
  const [milestoneDetails, setMilestoneDetails] = useState(false);
  return (
    <div>
      <div
        onClick={() => setMilestoneDetails(!milestoneDetails)}
        className="hover:bg-gray-100 border-2 rounded-full border-blue-500 h-16 flex flex-row items-center justify-between px-10 font-bold text-base"
      >
        <h1>Milestone 1</h1>
        <div className="flex flex-row items-center">
          {isMarked && <div className="mr-5 group flex flex-row bg-red-500 text-white rounded-full px-2.5 py-1.5 text-sm space-x-3 items-center justify-center">
            <span>Marked</span>
            <TiTick/>
          </div>}
          {milestoneDetails ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {milestoneDetails && (
        <div className="grid grid-cols-4 gap-y-5 my-7">
          <h2 className="font-semibold">Title:</h2>
          <h2 className="col-span-3">Software Requirement Submission</h2>
          <h2 className="font-semibold">Description:</h2>
          <h2 className="col-span-3">
            Develop a comprehensive Software Requirements Specification (SRS)
            document for your project, detailing its objectives, functional
            requirements, stakeholder roles, and security measures. Your SRS
            should provide a clear blueprint for the project`s development,
            addressing all essential aspects and ensuring alignment with
            stakeholder needs and project goals. Submit your SRS document by
            [deadline], adhering to the provided template and guidelines. This
            milestone is critical for establishing a solid foundation for the
            project and facilitating effective communication and collaboration
            among team members and stakeholders.
          </h2>
          <h2 className="font-semibold">Deadline:</h2>
          <h2 className="col-span-3">
            Tuesday, September 13th, 2024 at 3:00 PM
          </h2>
          <h2 className="font-semibold">Percentage:</h2>
          <h2 className="col-span-3">30%</h2>
          <h2 className="font-semibold">Resources:</h2>
          <div className="col-span-3 flex flex-row">
            <ResourceButton name="Template" />
            <ResourceButton name="Guidelines" />
          </div>
          <line className="col-span-4 border-t-2 border-gray-300"></line>
          <h2 className="font-semibold">Submission Files:</h2>
          <div className="col-span-3 flex flex-row">
            <ResourceButton name="Software Requirement Specification" />
          </div>
          <h2 className="font-semibold">Marks:</h2>
          <div className="col-span-3">
            <MarkSection isMarked={isMarked}/>
          </div>
        </div>
      )}
    </div>
  );
}

export default MilestoneTab;
