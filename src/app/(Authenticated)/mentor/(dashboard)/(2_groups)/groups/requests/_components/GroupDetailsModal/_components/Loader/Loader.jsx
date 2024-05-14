import { Player } from "@lottiefiles/react-lottie-player";
import React from "react";

function Loader() {
  return (
    <div
      className={`flex flex-col items-center justify-center`}
    >
      <Player src={`/loader.json`} className="player h-44 w-44" loop autoplay />
    </div>
  );
}

export default Loader;
