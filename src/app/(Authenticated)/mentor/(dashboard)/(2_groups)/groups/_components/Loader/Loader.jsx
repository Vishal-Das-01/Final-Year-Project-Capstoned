import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";
import styles from "./Loader.module.css";

function Loader() {
  return (
    <div
      className={`${styles.container} flex flex-col items-center justify-center`}
    >
      <Player src={`/loader.json`} className="player h-44 w-44" loop autoplay />
    </div>
  );
}

export default Loader;
