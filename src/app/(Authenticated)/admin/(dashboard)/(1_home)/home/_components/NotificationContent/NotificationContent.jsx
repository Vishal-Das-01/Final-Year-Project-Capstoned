"use client";

import styles from "./NotificationContent.module.css";
import NoNotificationIcon from "./_components/NoNotificationIcon/NoNotificationIcon";
import NotificationListTile from "../_components/NotificationListTile/NotificationListTile";

export default function NotificationContent({notifications, notificationIDs}){
	return (
		<div className={`h-full w-full`}>

			<div className={`mx-2 my-4`}>

				<div className={`${styles.contentHeadingWrapper} flex flex-row items-center `}>

					<h1 className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}>
						New Notifications
					</h1>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>

				<div className={`${styles.notificationsInfoWrapper} flex flex-col my-2`}>

					{
						(notifications.length === 0)
						
						?

						<NoNotificationIcon />

						:

						notifications.map((notification, index) => {
							return <NotificationListTile key={notificationIDs[index]} notificationText={notification}/>
						})
					}
					
				</div>

			</div>

		</div>
	);
}

