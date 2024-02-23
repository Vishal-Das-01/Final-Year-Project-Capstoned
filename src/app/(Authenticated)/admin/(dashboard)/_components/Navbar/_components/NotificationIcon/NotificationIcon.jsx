"use client";

import { IoMdNotificationsOutline } from "react-icons/io";
import styles from "./NotificationIcon.module.css";

export default function NotificationIcon(props){
	return (
		<div className={`${styles.notifIconContainer} flex flex-row items-center justify-center relative bg-transparent`}>
			<button className={`flex flex-row items-center justify-center bg-transparent`} onClick={() => console.log("Notif Clicked")}>
				<IoMdNotificationsOutline className={`${styles.notificationIcon}`} />
				<div className={`${styles.notifCountContainer} flex flex-row items-center justify-center bg-black absolute rounded-full`}>
					<p className={`${styles.notifCount} text-white `}>
						2
					</p>
				</div>
				<div className={`w-10 h-10 rounded-full absolute opacity-0 bg-neutral-500 hover:opacity-30`}>

				</div>
			</button>
			
		</div>
	);
}