import SideMenuItem from "./_components/SideMenuItem/SideMenuItem.jsx";
import { MdSpaceDashboard } from "react-icons/md";
import { GiStoneSphere } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaStaylinked } from "react-icons/fa6";
import { FRONTEND_ROUTES } from "@/utils/frontend_routes.js"; 
import styles from "./SideMenu.module.css";

export default function SideMenu(props){
	return (
		<div className={`${styles.sideMenu} flex flex-col items-center justify-center w-full h-full`}>

			<div className={`${styles.secondaryContainer} w-full flex flex-col items-center `}>

				<SideMenuItem href={FRONTEND_ROUTES.admin_dashboard_home_page} icon={<MdSpaceDashboard/>}>
					Dashboard
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.admin_dashboard_milestones_page} icon={<GiStoneSphere/>}>
					Milestones
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.admin_dashboard_fypgroups_page} icon={<HiMiniUserGroup/>}>
					FYP Groups
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.admin_dashboard_meetings_page} icon={<FaStaylinked/>}>
					Meetings
				</SideMenuItem>

			</div>
			
		</div>
	);
}