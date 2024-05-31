import React from "react";
import styles from "./UpcomingMilestone.module.css";

export default function UpcomingMilestone({ milestone }) {
    return (
        <div className={`w-full h-full flex flex-col items-center justify-center  mt-1`}>
            
            <div className={`${styles.milestoneNameContainer} text-neutral-400 w-full flex justify-center `}>

                <p className={`${styles.milestoneName} font-montserrat`}>
                    {`Milestone 3`}
                </p>
            
            </div>

            <div className={`${styles.milestoneNumberDayContainer} w-full flex items-center justify-center `}>

                <p className={`${styles.milestoneNumberDay} font-montserrat font-bold text-blue-500`}>
                    {"2"}
                </p>

            </div>

            <div className={`${styles.remainingDateAndDayContainer} w-full text-neutral-400 flex-col items-center justify-center`}>

                <p className={`${styles.remainingDate} font-montserrat text-center `}>
                    {`May, 2024`}
                </p>

                <p className={`${styles.remainingDay} font-montserrat text-center`}>
                    {`Saturday`}
                </p>

            </div>

        </div>
    );
}
