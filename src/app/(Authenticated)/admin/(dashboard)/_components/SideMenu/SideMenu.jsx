import SideMenuItem from "./_components/SideMenuItem/SideMenuItem.jsx";
import { MdSpaceDashboard } from "react-icons/md";
import { GiStoneSphere } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaStaylinked } from "react-icons/fa6";
import styles from "./SideMenu.module.css";

export default function SideMenu(props){
	return (
		<div className={`${styles.sideMenu} flex flex-col items-center justify-center w-full h-full border-2 border-pink-500`}>

			<div className={`${styles.secondaryContainer} w-full flex flex-col items-center `}>

				<SideMenuItem href="/admin/home" icon={<MdSpaceDashboard color="#3b82f6"/>}>
					Dashboard
				</SideMenuItem>

				<SideMenuItem href="/admin/milestones" icon={<GiStoneSphere color="#3b82f6"/>}>
					Milestones
				</SideMenuItem>

				<SideMenuItem href="/admin/fyp-groups" icon={<HiMiniUserGroup color="#3b82f6"/>}>
					FYP Groups
				</SideMenuItem>

				<SideMenuItem href="/admin/meetings" icon={<FaStaylinked color="#3b82f6"/>}>
					Meetings
				</SideMenuItem>

			</div>
			
		</div>
	);
}