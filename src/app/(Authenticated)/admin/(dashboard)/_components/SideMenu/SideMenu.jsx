import SideMenuItem from "./_components/SideMenuItem/SideMenuItem.jsx";
import { MdSpaceDashboard } from "react-icons/md";
import { GiStoneSphere } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaStaylinked } from "react-icons/fa6";
import { FaRocketchat } from "react-icons/fa";
import { AiFillProject } from "react-icons/ai";
import { IoLogoAppleAr } from "react-icons/io5";
import { BiAdjust } from "react-icons/bi";
import styles from "./SideMenu.module.css";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes.js";

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

				<SideMenuItem href={FRONTEND_ROUTES.admin_dashboard_accounts_page} icon={<FaStaylinked/>}>
					Accounts
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.admin_dashboard_chat_page} icon={<FaRocketchat/>}>
					Chat
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.admin_dashboard_projects_page} icon={<AiFillProject/>}>
					Projects
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.admin_dashboard_companies_page} icon={<IoLogoAppleAr/>}>
					Companies
				</SideMenuItem>

				<SideMenuItem href={FRONTEND_ROUTES.admin_dashboard_announcements_page} icon={<BiAdjust/>}>
					Announcements
				</SideMenuItem>

			</div>
			
		</div>
	);
}