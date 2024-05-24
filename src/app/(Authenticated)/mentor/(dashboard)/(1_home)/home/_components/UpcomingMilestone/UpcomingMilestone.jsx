import React from "react";
import styles from "./up.module.css";

function UpcomingMilestone({milestone}) {
  
  const date = new Date(milestone[0].deadline);
  const day = date.getDate();
  const month = date.toLocaleString('default', { month: 'long' });
  const dayName = date.toLocaleString('default', { weekday: 'long' });
  const year = date.getFullYear();

  return (
    <div
      className={`${styles.contentCardContainer} flex h-full py-3 flex-col items-center justify-start rounded-xl font-montserrat`}
    >
      <h className="text-white font-bold text-sm mb-8">Upcoming Milestone Deadline</h>
      <div className="flex flex-col items-center justify-center flex-1">
        <h2 className="text-gray-500 text-lg ">Milestone {milestone[0].assignmentNumber} - {milestone[0].title}</h2>
        <p className="text-black font-bold text-8xl">{day}</p>
        <p className="text-gray-500 text-lg mb-1">{month}, {year}</p>
        <p className="text-gray-500 text-lg">{dayName}</p>
      </div>
    </div>
  );
}

export default UpcomingMilestone;
