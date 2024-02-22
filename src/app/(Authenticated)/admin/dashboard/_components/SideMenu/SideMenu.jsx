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
				<SideMenuItem href="/" icon={<MdSpaceDashboard />}>
					Dashboard
				</SideMenuItem>
				<SideMenuItem href="/" icon={<GiStoneSphere />}>
					Milestones
				</SideMenuItem>
				<SideMenuItem href="/" icon={<HiMiniUserGroup />}>
					FYP Groups
				</SideMenuItem>
				<SideMenuItem href="/" icon={<FaStaylinked />}>
					Meetings
				</SideMenuItem>
			</div>
		</div>
	);
}