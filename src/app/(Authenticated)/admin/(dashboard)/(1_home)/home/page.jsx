"use client";

// Imports below for UI creation
import styles from "./AdminHomePage.module.css";
import ContentCard from "./_components/ContentCard/ContentCard.jsx";
import WelcomeContent from "./_components/WelcomeContent/WelcomeContent.jsx";
import MilestonesContent from "./_components/MilestonesContent/MilestonesContent.jsx";
import DaysLeftContent from "./_components/DaysLeftContent/DaysLeftContent.jsx";
import FYPGroupsContent from "./_components/FYPGroupsContent/FYPGroupsContent.jsx";
import DesignContent from "./_components/DesignContent/DesignContent.jsx";
import NotificationContent from "./_components/NotificationContent/NotificationContent.jsx";

// Imports below for state management and api calls
import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { useDispatch } from "react-redux";
import { useRouter } from "next/navigation";
import { getDashboardDataAPICall } from "@/utils/admin_frontend_api_calls/DashboardAPICall";

// export const metadata = {
// 	title: "Admin Home",
// 	description: "Capstoned Admin Home | Final Year Project (FYP) Management Platform for College & University Students.",
// }

export default function AdminDashboardHomePage(props){

	// For managing fetched data from api
	// for managing loading skeleton indicators
	const [fetchedData, setFetchedData] = useState({});
	const [hasDataLoaded, setHasDataLoaded] = useState(false);
	const [hasErrorOccurred, setHasErrorOccurred] = useState(false);
	const [notifications, setNotifications] = useState([]);
	const [notificationIDs, setNotificationIDs] = useState([]);

	// For access token retrieval
	const authDetails = useSelector((state) => state.AuthDetails);
	
	// For routing back to landing page if
	// the user is not logged in or
	// if access token has expired
	const dispatch = useDispatch();
	const router = useRouter();

	// API Call for fetching dashboard data
	async function getDashboardData(){
		let accessToken = authDetails.accessToken;
		let apiURL = BACKEND_ROUTES.fetchAdminDashboardData;
		setHasDataLoaded(false);

		let apiResponse = await getDashboardDataAPICall(apiURL, accessToken);
		if(apiResponse.status === HttpStatusCode.Ok){
			let apiResponseData = await apiResponse.json();
			setHasDataLoaded(true);
			setFetchedData(apiResponseData);

			console.log("getDashboardData:", apiResponseData);
		}
		else if (apiResponse.status === HttpStatusCode.Unauthorized) {
			const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
			  method: "POST",
			});
			if (responseLogOut.status === HttpStatusCode.Ok) {
			  dispatch(removeAuthDetails());
			  router.replace(FRONTEND_ROUTES.landing_page);
			}
		}
		else{
			setHasErrorOccurred(true);
			console.log("getDashboardData error:", apiResponse);
		}
	}

	// API Call for fetching dashboard data 
	// when the page is loaded 
	useEffect(() => {
		getDashboardData();
	}, [])

	// For setting notifications to an array
	// when data is successfully fetched
	useEffect(() => {
		// console.log("Admin Dashboard Home Page", fetchedData.notifications, typeof fetchedData.notifications);
		if(hasDataLoaded){
			let notificationArr = []
			let notificationIDArr = [];
			fetchedData.notifications.map((notif) => {
				notificationArr.push(notif.headline);
				notificationIDArr.push(notif._id);
			})

			// console.log("HERE ", notificationArr.length)
			setNotifications(notificationArr);
			setNotificationIDs(notificationIDArr);
		}
	}, [fetchedData])


	return (
		<div className={`${styles.pageContainer} w-full h-full flex flex-row items-center justify-center `}>
			
			<div className={`${styles.primaryContainer} overflow-auto flex flex-row `}>
				
				<div className={`${styles.left} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>

						{
							hasDataLoaded
							
							?

							<WelcomeContent 
								name={`Admin`} 
								// notificationCount={2}
								// messageCount = {4}
							/>

							:

							<div className={`animate-pulse  w-full h-full bg-neutral-100`} />

						}
					
					</ContentCard>

					<ContentCard>
						
						{
							
							hasDataLoaded
							
							?

							<NotificationContent 
								notifications={notifications}
								notificationIDs={notificationIDs}
							/>

							:

							<div className={`animate-pulse  w-full h-full bg-neutral-100`} />

						}
					
					</ContentCard>

				</div>

				<div className={`${styles.center} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>

						{
							hasDataLoaded
							
							?
							
							<MilestonesContent 
								milestone={fetchedData.milestone}
							/>

							:

							<div className={`animate-pulse  w-full h-full bg-neutral-100`} />

						}

					</ContentCard>

					<ContentCard>

						{
							hasDataLoaded

							?

							<FYPGroupsContent 
								fypGroupCount={fetchedData.numOfGroups}
							/>

							:

							<div className={`animate-pulse w-full h-full bg-neutral-100`} />

						}

					</ContentCard>

				</div>

				<div className={`${styles.right} w-full h-full flex flex-col flex-1 items-center justify-evenly `}>

					<ContentCard>
						
						{
							hasDataLoaded

							?

							<DaysLeftContent 
								startDate={"2023-09-01"}
								endDate={"2024-05-31"}
								currentDate={`2024-03-23`}
							/>

							:

							<div className={`animate-pulse w-full h-full bg-neutral-100`} />

						}

					</ContentCard>

					<ContentCard>

						{

							hasDataLoaded

							?

							<DesignContent />

							:

							<div className={`animate-pulse w-full h-full bg-neutral-100`} />
							
						}
					
					</ContentCard>

				</div>

			</div>
		
		</div>
	);
}