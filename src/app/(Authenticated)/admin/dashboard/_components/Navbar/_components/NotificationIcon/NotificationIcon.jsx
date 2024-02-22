"use client";

import { IoMdNotificationsOutline } from "react-icons/io";
import styles from "./NotificationIcon.module.css";

export default function NotificationIcon(props){
	return (
		<div className={`${styles.notifIconContainer} flex flex-row items-center justify-center relative `}>
			<button onClick={() => console.log("Notif Clicked")}>
				<IoMdNotificationsOutline className={`${styles.notificationIcon}`} />
				<div className={`${styles.notifCountContainer} flex flex-row items-center justify-center bg-black absolute rounded-full`}>
					<p className={`${styles.notifCount} text-white `}>
						2
					</p>
				</div>
			</button>
		</div>
	);
}