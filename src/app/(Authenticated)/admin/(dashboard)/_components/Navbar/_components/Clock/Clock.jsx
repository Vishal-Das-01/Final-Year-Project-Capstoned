"use client";
import React, { useEffect, useState } from "react";
import styles from "./Clock.module.css";

function Clock() {
  const [time, setTime] = useState("");

  function formatTime(val) {
    if (val < 10) {
      return "0";
    } else {
      return "";
    }
  }
  
  function tick () {
      const d = new Date();
      const h = d.getHours();
      const m = d.getMinutes();
      const s = d.getSeconds();
  
      setTime(
        formatTime(h) + h + " : " + formatTime(m) + m + " : " + formatTime(s) + s
      );
  }

  useEffect(() => {
    const timerID = setInterval(() => tick(), 1000);

    return function cleanup() {
        clearInterval(timerID);
    };
  });

  return (
    <div
      className={`${styles.centerContent} bg-gray-200 h-2/3 w-1/2 rounded-full clock flex flex-row items-center justify-center`}
    
    >
        <h1 className="time font-extrabold text-xl text-black">{time}</h1>
    </div>
  );
}

export default Clock;
