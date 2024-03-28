import SideMenuItem from "./_components/SideMenuItem/SideMenuItem.jsx";
import styles from "./SideMenu.module.css";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes.js";

export default function SideMenu(props){
	return (
		<div className={`${styles.sideMenu} flex flex-col items-center justify-center w-full h-full`}>

			<div className={`${styles.secondaryContainer} w-full flex flex-col items-center `}>

				<SideMenuItem href={FRONTEND_ROUTES.mentor_dashboard_home_page}>
					Dashboard
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.mentor_dashboard_fyp_groups_page}>
					FYP Groups
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.mentor_dashboard_fyp_projects_page}>
					FYP Projects
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.mentor_dashboard_my_proposals_page}>
					My Proposals
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.mentor_dashboard_profile_page}>
					Profile
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.mentor_dashboard_chats_page}>
					Chats
				</SideMenuItem>

				<div className="flex flex-col flex-1"></div>

				<SideMenuItem href={FRONTEND_ROUTES.landing_page}>
					Logout
				</SideMenuItem>
			</div>
			
		</div>
	);
}