"use client";

import { IoMdNotificationsOutline } from "react-icons/io";
import styles from "./NotificationIcon.module.css";
import NotificationsDropdown from "../NotificationsDropdown/NotificationsDropdown";
import { useState, useEffect } from "react";
import { callAPI } from "@/utils/helpers/callAPI";
import { useSelector } from "react-redux";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useSocket } from "@/utils/helpers/socketProvider";

export default function NotificationIcon(){

	const { socket } = useSocket();
	
    const [notifications, setNotifications] = useState([]);
	const [isDropdownOpen, setIsDropdownOpen] = useState(false);
	const [hideButton, setHideButton] = useState(false)
	const [page, setPage] = useState(1);
	const [unreadNotifications, setUnreadNotifications] = useState(0);

	const authDetails = useSelector((state) => state.AuthDetails);

	useEffect(() => {
		if (socket) {
			const handleNewNotification = (notification) => {
				setNotifications(prevNotifications => {
					const newNotifications = [notification, ...prevNotifications];
					setUnreadNotifications(prevCount => prevCount + (!notification.read ? 1 : 0));
					return newNotifications;
				});
			};
			
			socket.on(`notification:${authDetails.profileID}`, handleNewNotification);
			socket.on(`notification:all`, handleNewNotification);
			socket.on(`notification:mentors`, handleNewNotification);

			return () => {
				socket.off(`notification:${authDetails.profileID}`, handleNewNotification);
				socket.off(`notification:all`, handleNewNotification);
				socket.off(`notification:mentors`, handleNewNotification);
			};
		}
	}, [socket, authDetails.profileID]);

	const toggleDropdown = () => {
    	setIsDropdownOpen(prev => !prev);
  	};

	const getNotifications = async () => {
		try {
			const response = await callAPI(
				"GET",
				authDetails.accessToken,
				`${BACKEND_ROUTES.getMentorNotifications}?page=${page}`
			);
			
			const responseData = await response.json();
			
			if (response.status === 200) {
				setPage(page+1)

				if (responseData.data.notifications.length < 5) {
					setHideButton(true);
				} else {
					setHideButton(false);
				}

				const newNotifications = [...notifications, ...responseData.data.notifications]
				setNotifications(newNotifications);

				const unreadCount = newNotifications.filter(notification => !notification.read).length;
				setUnreadNotifications(unreadCount)
			}
			else if(response.status === 403) {
				router.replace(FRONTEND_ROUTES.login_page);
			}
		} catch(error) {}
	}

	const markNotificationRead = async (notificationID) => {
		try {
			const updatedNotifications = notifications.map(notification => {
				if (notification._id === notificationID) {
					return { ...notification, read: true };
				} else {
					return notification;
				}
			});
			setNotifications(updatedNotifications);

			setUnreadNotifications(unreadNotifications-1)

			const response = await callAPI(
				"PATCH",
				authDetails.accessToken,
				`${BACKEND_ROUTES.markNotificationRead}?id=${notificationID}`
			);
			
			if(response.status === 403) {
				router.replace(FRONTEND_ROUTES.login_page);
			}
		} catch(error) {}
	}

	useEffect(() => {
		getNotifications()
	}, [])

	return (
		<div className={`${styles.notifIconContainer} flex flex-row items-center justify-center relative bg-transparent`}>

			<button className={`flex flex-row items-center justify-center bg-transparent`} onClick={() => toggleDropdown()}>
				
				<IoMdNotificationsOutline className={`${styles.notificationIcon}`} />
				
				{unreadNotifications > 0 ? 
				<div className={`${styles.notifCountContainer} flex flex-row items-center justify-center bg-black absolute rounded-full`}>
					<p className={`${styles.notifCount} text-white `}>{unreadNotifications}</p>
				</div> :
				<div />}
				
				<div className={`w-10 h-10 rounded-full absolute opacity-0 bg-neutral-500 hover:opacity-30`} />
			
			</button>

			{isDropdownOpen && 
			(<NotificationsDropdown notifications={notifications} getNotifications={getNotifications} 
				hideButton={hideButton}  markNotificationRead={markNotificationRead}/>)}
			
		</div>
	);
}