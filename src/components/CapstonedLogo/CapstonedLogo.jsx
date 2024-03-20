import styles from "./CapstonedLogo.module.css";
import Image from "next/image";

export default function CapstonedLogo(){
	return (
		<div className={`${styles.logoWrapper} flex flex-row items-center justify-center rounded-full relative`}>

			<Image 
				src={`/logo4.png`} 
				height={80} 
				width={80}
				className={`relative z-10`} 
			/>

			<div className={`${styles.logoBg} flex flex-row items-center justify-center self-center absolute w-full h-full rounded-2xl bg-neutral-700 z-0`} />
		
		</div>
	);
}