"use client";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

export default function DaysLeftChart({startDate, endDate, currentDate}) {

  const [totalDays, setTotalDays] = useState(0);
  const [daysPassed, setDaysPassed] = useState(0);
  const [remainingDays, setRemainingDays] = useState(0);
  const [progress, setProgress] = useState(0); // state for animated progress

  function calculateDaysBetweenDates(date1, date2) {
    const start = new Date(date1);
    const end = new Date(date2);
    
    const diffInMs = end.getTime() - start.getTime();
    const days = Math.ceil(diffInMs / (1000 * 60 * 60 * 24));
    return days;
  }

  useEffect(() => {
    const allDays = calculateDaysBetweenDates(startDate, endDate);
    const daysPassed = calculateDaysBetweenDates(startDate, currentDate)
    const daysRemaining = calculateDaysBetweenDates(currentDate, endDate);
    setTotalDays(allDays);
    setDaysPassed(daysPassed);
    setRemainingDays(daysRemaining);
  }, [startDate, endDate, currentDate]);

  useEffect(() => {
    let progressInterval;
    if (daysPassed > 0 && totalDays > 0) {
      progressInterval = setInterval(() => {
        setProgress((prevProgress) => {
          const nextProgress = Math.min(prevProgress + 1, daysPassed);
          if (nextProgress >= daysPassed) {
            clearInterval(progressInterval);
          }
          return nextProgress;
        });
      }, 3); // Adjust this value for faster/slower animation
    }

    return () => {
      clearInterval(progressInterval);
    };
  }, [daysPassed, totalDays]);

  return (
    <div style={{ width: 200, height: 200 }}>

      <CircularProgressbar
        value={progress}
        maxValue={totalDays}
        minValue={0}
        text={`${remainingDays} Days`}
        styles={{
          root: {
            height: "100%",
            width: "100%",
            filter: 'drop-shadow(0px 6px 12px rgba(0, 0, 0, 0.15))'
          },
          path: {
            stroke: "rgb(63,131,248)",
            strokeLinecap: "round",
            transition: "stroke-dashoffset",
            transform: "rotate(0.75turn)",
            transformOrigin: "center center",
          },
          trail: {
            stroke: "#d6d6d6",
            strokeLinecap: "round",
            transform: "rotate(0.75turn)",
            transformOrigin: "center center",
          },
          text: {
            fill: "rgb(55, 65, 81)",
            fontSize: "9px",
            fontFamily: "Poppins",
          },
        }}
        strokeWidth={10}
      />

    </div>
  );
}

