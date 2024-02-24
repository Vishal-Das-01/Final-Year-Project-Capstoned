"use client";

import Image from "next/image";
import styles from "./Avatar.module.css";

export default function Avatar({src, alt}){
	return (
		<div className={`${styles.avatarContainer} flex flex-row items-center justify-center relative `}>

			<button className={`relative flex flex-row items-center justify-center`} onClick={() => console.log("Avatar Clicked")}>

				<div className={`w-full h-full relative`}>
				
					<Image 
						src={src} 
						alt={alt}
						height={40}
						width={40}
					/>
				
				</div>
				
				<div className={`w-full h-full rounded-full absolute opacity-0 bg-neutral-500 hover:opacity-30`} />
				
			</button>
		
		</div>
	);
}