import React from "react";
import styles from "./UpcomingMilestone.module.css";

function UpcomingMilestone() {
  return (
    <div
      className={`${styles.contentCardContainer} flex h-full py-3 flex-col items-center justify-start rounded-xl font-montserrat`}
    >
      <h className="text-white font-bold text-sm mb-8">Upcoming Milestone Deadline</h>
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-gray-500 text-lg ">Milestone 1 - SRS Submission</h2>
        <p className="text-black font-bold text-8xl">19</p>
        <p className="text-gray-500 text-lg mb-1">September, 2024</p>
        <p className="text-gray-500 text-lg">Monday</p>
      </div>
    </div>
  );
}

export default UpcomingMilestone;
