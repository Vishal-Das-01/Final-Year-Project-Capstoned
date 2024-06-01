"use client";

import Image from "next/image";
import styles from "./Avatar.module.css";
import { useSelector } from "react-redux";
import { useState } from "react";
import Link from "next/link";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";

export default function Avatar({alt}){
	const authDetails = useSelector((state) => state.AuthDetails);
	const [profileImage, setProfileImage] = useState(authDetails.profileImage);

	return (

		<Link href={FRONTEND_ROUTES.admin_dashboard_home_page}>

			<div className={`${styles.avatarContainer} flex flex-row items-center justify-center relative `}>

				<button className={`relative flex flex-row items-center justify-center`} onClick={() => console.log("Avatar Clicked")}>

					<div className={`w-full h-full relative`}>
					
						<Image 
							className={`rounded-full`}
							src={profileImage || "/picCircular.png"} 
							alt={alt}
							height={100}
							width={100}
							/>
					
					</div>
					
					<div className={`w-full h-full rounded-full absolute opacity-0 bg-neutral-500 hover:opacity-30`} />
					
				</button>
			
			</div>

		</Link>
	);
}