import React from "react";
import BackButton from "./_components/BackButton/BackButton";
import MilestoneTab from "./_components/MilestoneTab/MilestoneTab";
import ResourceButton from "./_components/ResourceButton/ResourceButton";
import MarkSection from "./_components/MarkSection/MarkSection";
import styles from './CurrentProjects.module.css'
import MainMarkSection from "./_components/MainMarkSection/MainMarkSection";

function ProjectPage() {
  return (
    <div className={`${styles.contentCardTitleContainer} ${styles.container} p-3 overflow-auto my-9 mx-5 flex flex-col rounded-xl font-montserrat`}>
    <div className="m-5 flex flex-col space-y-7">
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-semibold">
          Project Name - IBA Computer Group
        </h1>
        <h2 className="font-light">Fall 2024</h2>
      </div>
      <div className="grid grid-cols-4 gap-y-5">
        <h2 className="font-semibold">Your Role:</h2>
        <h2 className="col-span-3">Student/Group Lead</h2>
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
          <MainMarkSection isMarked={true}/>
        </div>
      </div>
    <MilestoneTab isMarked={true}/>
    <MilestoneTab isMarked={false}/>
    <MilestoneTab isMarked={false}/>
    </div>
    </div>
  );
}

export default ProjectPage;
