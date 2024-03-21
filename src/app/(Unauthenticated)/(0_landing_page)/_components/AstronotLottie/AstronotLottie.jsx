"use client";

import { Player } from '@lottiefiles/react-lottie-player';
import styles from "./AstronotLottie.module.css"

export default function AstronotLottie({src}){
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