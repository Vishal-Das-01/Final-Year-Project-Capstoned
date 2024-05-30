import React from "react";
import styles from "./up.module.css";

function UpcomingMilestone({ milestone }) {

  let day;
  let month;
  let dayName;
  let year;
  
  if (milestone) {
    const date = new Date(milestone.deadline);
    day = date.getDate();
    month = date.toLocaleString("default", { month: "long" });
    dayName = date.toLocaleString("default", { weekday: "long" });
    year = date.getFullYear();
  }
  return (
    <div
      className={`${styles.contentCardContainer} flex h-full py-3 flex-col items-center justify-start rounded-xl font-montserrat`}
    >
      <h className="mb-8 text-sm font-bold text-white">
        Upcoming Milestone Deadline
      </h>
      {milestone && (
        <div className="flex flex-col items-center justify-center flex-1">
          <h2 className="text-lg text-gray-500 ">
            Milestone {milestone.assignmentNumber} - {milestone.title}
          </h2>
          <p className="font-bold text-black text-8xl">{day}</p>
          <p className="mb-1 text-lg text-gray-500">
            {month}, {year}
          </p>
          <p className="text-lg text-gray-500">{dayName}</p>
        </div>
      )}
    </div>
  );
}

export default UpcomingMilestone;
