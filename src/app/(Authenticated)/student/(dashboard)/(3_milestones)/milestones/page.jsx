import React from "react";
import MilestoneTable from "./_components/MilestoneTable";
import styles from "./MyMilestones.module.css";

export const metadata = {
    title: "Group Milestones",
    description: "Capstoned Student Milestones | Final Year Project (FYP) Management Platform for College & University Students.",
};

const milestones = [
  {
    name: "Milestone 1",
    description: "Milestone 1 Description",
    number: 1,
    deadline: "2024-01-01",
    created: "2024-01-01",
    lastModified: "2024-01-01",
    totalMarks: 100,
  },
  {
    name: "Milestone 2",
    description: "Milestone 2 Description",
    number: 2,
    deadline: "2024-02-01",
    created: "2024-02-01",
    lastModified: "2024-02-01",
    totalMarks: 100,
  },
  {
    name: "Milestone 3",
    description: "Milestone 3 Description",
    number: 3,
    deadline: "2024-03-01",
    created: "2024-03-01",
    lastModified: "2024-03-01",
    totalMarks: 100,
  },
];

function MyMilestones() {
  return (
    <div
      className={`${styles.contentCardTitleContainer} p-3 overflow-auto my-9 mx-5 flex flex-col rounded-xl font-montserrat`}
    >
      <div className="flex flex-row items-center py-2 mr-5 w-auto justify-between">
        <div className="flex flex-row items-center">
          <h1
            className={`${styles.contentHeading} font-semibold text-black`}
          >
            Group Milestones
          </h1>
          <div
            className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
          />
        </div>
        <div>
        </div>
      </div>
          <MilestoneTable milestones={milestones} />
        </div>
  );
}

export default MyMilestones;
