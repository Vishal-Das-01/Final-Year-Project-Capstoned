"use client";
import React, { useEffect, useState } from "react";
import styles from "./ProjectProgressBar.module.css";

function ProjectProgressBar({progress}) {

  const [number,setNumber] = useState(0);
  let counter = 0;

  useEffect(() => {
    const timer = setInterval(() => {
      if (counter === progress) {
        clearInterval(timer); // Clear the interval when counter reaches 65
      } else {
        counter += 1;
        setNumber(counter);
      }
    }, 30);

    // Cleanup function to clear the interval on component unmount
    return () => clearInterval(timer);
  }, []);

  return (
    <div className="absolute h-52 w-52">
      <div className={`${styles.outer}`}>
        <div className={`${styles.inner}`}>
          <div className={`${styles.number}`} id='number'>
            {number}%
          </div>
        </div>
      </div>
      <svg 
      className={`${styles.svg}`}
      xmlns="http://www.w3.org/2000/svg"
        version="1.1"
        width={200}
        height={200}
      >
        <defs>
          <linearGradient id="GradientColor">
            <stop offset="0%" stopColor="#67e8f9" />
            <stop offset="100%" stopColor="#3f83f8" />
          </linearGradient>
        </defs>
        <circle className={`${styles.circle}`} cx="100" cy="100" r="85" stroke-linecap="round" />
      </svg>
    </div>
  );
}

export default ProjectProgressBar;
