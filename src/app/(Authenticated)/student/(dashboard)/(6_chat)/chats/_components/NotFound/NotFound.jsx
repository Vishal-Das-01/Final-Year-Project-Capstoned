"use client";
import React from "react";
import styles from "./NotFound.module.css";
import { Player } from "@lottiefiles/react-lottie-player";

function NotFound() {
  return (
    <div className={`${styles.container} flex flex-col items-center justify-center`}>
        <Player src={`/NotFound.json`} className="player h-44 w-44" loop autoplay />
    </div>
  );
}

export default NotFound;
