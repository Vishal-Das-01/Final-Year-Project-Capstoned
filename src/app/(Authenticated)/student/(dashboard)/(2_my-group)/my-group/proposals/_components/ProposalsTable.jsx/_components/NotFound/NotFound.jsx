"use client";
import React from "react";
import styles from "./NotFound.module.css";
import { Player } from "@lottiefiles/react-lottie-player";

function NotFound() {
  return (
    <tr className={`${styles.container}`}>
      <td colSpan="7">
        <Player src={`/NotFound.json`} className="player h-44 w-44" loop autoplay />
      </td>
    </tr>
  );
}

export default NotFound;
