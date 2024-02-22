"use client";

import Image from "next/image";
import styles from "./Avatar.module.css";

export default function Avatar({src, alt}){
	return (
		<div className={`${styles.avatarContainer} flex flex-row items-center justify-center relative `}>
			<button onClick={() => console.log("Avatar Clicked")}>
				<div className={`w-full h-full`}>
					<Image 
						src={src} 
						alt={alt}
						height={40}
						width={40}
					/>
				</div>
			</button>
		</div>
	);
}