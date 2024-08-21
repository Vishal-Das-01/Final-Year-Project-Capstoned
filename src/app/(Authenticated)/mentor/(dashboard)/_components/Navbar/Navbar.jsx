import styles from "./Navbar.module.css";
import Brand from "@/components/Brand/Brand.jsx";
import Avatar from "./_components/Avatar/Avatar.jsx";
import NotificationIcon from "./_components/NotificationIcon/NotificationIcon.jsx";
import {FRONTEND_ROUTES_MENTOR} from "@/utils/routes/frontend_routes";
import CapstonedLogo from "@/components/CapstonedLogo/CapstonedLogo";
import Clock from "./_components/Clock/Clock";

export default function Navbar(props){
	return (
		<div className={`${styles.navbar} w-full h-full flex flex-row`}>

			<div className={`${styles.left} flex flex-row flex-1 items-center justify-start`}>

				<div className={`${styles.leftContent} w-full h-full flex flex-row items-center justify-start `}>
					<CapstonedLogo />
					<Brand href={FRONTEND_ROUTES_MENTOR.mentor_dashboard_home_page}>
						Capstoned
					</Brand>
				
				</div>
			
			</div>

			{/* <div className="flex flex-row items-center justify-center flex-1 w-full h-full ">
				<Clock />
			</div> */}

			<div className={`${styles.right} flex flex-row flex-1 `}>

				<div className={`${styles.rightContentContainer} w-full h-full flex flex-row items-center justify-end `}>
					
					<div className={`${styles.rightContent} flex flex-row items-center justify-end h-full`}>

						<NotificationIcon />
						
						<Avatar 
							alt="Profile Picture"
						/>
					
					</div>
				
				</div>
			
			</div>
		
		</div>
	);
}