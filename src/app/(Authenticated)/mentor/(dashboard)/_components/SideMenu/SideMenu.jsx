import Logout from "./_components/Logout/Logout.jsx";
import SideMenuItem from "./_components/SideMenuItem/SideMenuItem.jsx";
import styles from "./SideMenu.module.css";
import { FRONTEND_ROUTES_MENTOR} from "@/utils/routes/frontend_routes.js";

export default function SideMenu(props){

	return (
		<div className={`${styles.sideMenu} flex flex-col items-center justify-center w-full h-full`}>

			<div className={`${styles.secondaryContainer} w-full flex flex-col items-center `}>

				<SideMenuItem href={FRONTEND_ROUTES_MENTOR.mentor_dashboard_home_page}>
					Dashboard
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES_MENTOR.mentor_dashboard_groups_page}>
					Groups
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES_MENTOR.mentor_dashboard_final_year_projects_current_page}>
					Final Year Projects
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES_MENTOR.mentor_dashboard_my_proposals_page}>
					My Proposals
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES_MENTOR.mentor_dashboard_profile_page}>
					Profile
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES_MENTOR.mentor_dashboard_users_page}>
					Users
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES_MENTOR.mentor_dashboard_chats_page}>
					Chats
				</SideMenuItem>

				<div className="flex flex-col flex-1"></div>

				<Logout/>
			</div>
			
		</div>
	);
}