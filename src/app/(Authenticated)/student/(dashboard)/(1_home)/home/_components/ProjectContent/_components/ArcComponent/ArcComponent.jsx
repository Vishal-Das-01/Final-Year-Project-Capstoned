"use client";
import React, { useEffect, useState } from "react";
import { CircularProgressbar } from "react-circular-progressbar";
import "react-circular-progressbar/dist/styles.css";

function ArcComponent({ progress }) {
    const [number, setNumber] = useState(0);
    let counter = 0;
  
    useEffect(() => {
      const totalDuration = 2000; // Total duration for the counter to reach progress (in milliseconds)
      const intervalTime = totalDuration / progress; // Calculate interval time
  
      const timer = setInterval(() => {
        if (counter >= progress) {
          clearInterval(timer);
        } else {
          counter += 1;
          setNumber(counter);
        }
      }, intervalTime);
  
      return () => clearInterval(timer);
    }, [progress]);

  return (
    <div className="mt-14" style={{ height: "120%", width: "120%" }}>
      <CircularProgressbar
        value={number}
        text={`${number} %`}
        circleRatio={0.5}
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
            fontSize: "14px",
            fontFamily: "Poppins",
          },
        }}
        strokeWidth={10}
      />
    </div>
  );
}

export default ArcComponent;
