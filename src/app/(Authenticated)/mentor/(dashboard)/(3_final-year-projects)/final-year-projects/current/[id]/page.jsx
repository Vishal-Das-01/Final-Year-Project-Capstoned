import React from "react";
import BackButton from "./_components/BackButton/BackButton";
import MilestoneTab from "./_components/MilestoneTab/MilestoneTab";
import Milestone from "@/models/Milestone";
import ResourceButton from "./_components/ResourceButton/ResourceButton";

function ProjectPage() {
  return (
    <div className="m-5 flex flex-col space-y-7">
      <BackButton />
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-semibold">
          Project Name - IBA Computer Group
        </h1>
        <h2 className="font-light">Fall 2024</h2>
      </div>
      <div className="grid grid-cols-4 gap-y-5">
        <h2 className="font-semibold">Your Role:</h2>
        <h2 className="col-span-3">Supervisor/Mentor</h2>
        <h2 className="font-semibold">Proposed By:</h2>
        <h2 className="col-span-3">Dr Muhammad Saeed</h2>
        <h2 className="font-semibold">Progress:</h2>
        <h2 className="col-span-3">30%</h2>
        <h2 className="font-semibold">Project Description:</h2>
        <p className="col-span-3">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
          eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad
          minim veniam, quis nostrud exercitation ullamco laboris nisi ut
          aliquip ex ea commodo consequat. Duis aute irure dolor in
          reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla
          pariatur. Excepteur sint occaecat cupidatat non proident, sunt in
          culpa qui officia deserunt mollit anim id est laborum.
        </p>
        <h2 className="font-semibold">Proposal Doc:</h2>
        <div className="col-span-3"><ResourceButton name="Hello World"/></div>
        <h2 className="font-semibold">Marks:</h2>
        <div className="col-span-3">
          <table className="border-4 border-double border-gray-500">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="w-36">Members</th>
                <th className="w-36">Marks Obtained</th>
                <th className="w-36">Total Marks</th>
              </tr>
            </thead>
            <tbody>
              <tr >
                <td className="pt-2">Syed Owais Ali</td>
                <td className="text-center">30</td>
                <td className="text-center">30</td>
              </tr>
              <tr>
                <td className="pt-2">Hamza Ali Akbar</td>
                <td className="text-center">25</td>
                <td className="text-center">30</td>
              </tr>
              <tr>
                <td className="pt-2">Taha Mirza</td>
                <td className="text-center">28</td>
                <td className="text-center">30</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    <MilestoneTab isMarked={true}/>
    <MilestoneTab isMarked={false}/>
    <MilestoneTab isMarked={false}/>
    </div>
  );
}

export default ProjectPage;
