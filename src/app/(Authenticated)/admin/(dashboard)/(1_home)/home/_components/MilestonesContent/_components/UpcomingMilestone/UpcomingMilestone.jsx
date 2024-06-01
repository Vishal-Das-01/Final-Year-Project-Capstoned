import React from "react";
import styles from "./UpcomingMilestone.module.css";

export default function UpcomingMilestone({ milestone }) {

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
        <div className={`w-full h-full flex flex-col items-center justify-center  mt-1`}>
            
            <div className={`${styles.milestoneNameContainer} text-neutral-400 w-full flex justify-center `}>

                <p className={`${styles.milestoneName} font-montserrat`}>
                    {`${milestone.title}`}
                </p>
            
            </div>

            <div className={`${styles.milestoneNumberDayContainer} w-full flex items-center justify-center `}>

                <p className={`${styles.milestoneNumberDay} font-montserrat font-bold text-blue-500`}>
                    {day}
                </p>

            </div>

            <div className={`${styles.remainingDateAndDayContainer} w-full text-neutral-400 flex-col items-center justify-center`}>

                <p className={`${styles.remainingDate} font-montserrat text-center `}>
                    {`${month}, ${year}`}
                </p>

                <p className={`${styles.remainingDay} font-montserrat text-center`}>
                    {dayName}
                </p>

            </div>

        </div>
    );
}
