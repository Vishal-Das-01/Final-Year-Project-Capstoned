"use client";

import { Player } from '@lottiefiles/react-lottie-player';
import styles from "./SpaceshipLottie.module.css"

export default function SpaceshipLottie({src}){
	return (
		<div className={`h-full w-full flex flex-row items-start justify-start`}>

			<Player
		        src={src}
		        className="player"
		        loop
  				autoplay
	      	/>
		
		</div>
	);
}