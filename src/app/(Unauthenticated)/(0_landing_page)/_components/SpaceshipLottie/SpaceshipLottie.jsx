"use client";

import { Player } from '@lottiefiles/react-lottie-player';
import styles from "./SpaceshipLottie.module.css"

export default function SpaceshipLottie({src}){
	return (
			<Player
		        src={src}
		        className="player h-96 w-96"
		        loop
  				autoplay
	      	/>
	);
}