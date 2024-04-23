"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { MdSpaceDashboard } from "react-icons/md";
import { GiStoneSphere } from "react-icons/gi";
import { HiMiniUserGroup } from "react-icons/hi2";
import { FaStaylinked } from "react-icons/fa6";
import { FaRocketchat } from "react-icons/fa";
import { AiFillProject } from "react-icons/ai";
import { IoLogoAppleAr } from "react-icons/io5";
import { BiAdjust } from "react-icons/bi";
import styles from "./SideMenuItem.module.css";


export default function SideMenuItem({href, children, icon}){
	const route = usePathname();

	// Gets Page Name in the URL.
	// /admin/home -> Will Return home
	// /admin/meetings -> Will Return meetings
	function getPagename(route){
		let firstSlash = route.indexOf("/");
		let secondSlash = route.substring(firstSlash + 1).indexOf("/");
		let pageName = route.substring(firstSlash + 1).substring(secondSlash + 1);
		return pageName;
	}

	// Corrects side menu item text
	// Corrects -> 'Dashboard' to 'home'
	// Corrects -> 'Milestones' to 'milestones'
	// Corrects -> 'FYP Groups' to 'fyp-groups'
	// Corrects ->'Meetings' to 'meetings'
	function correctMenuItemTextForComparison(children){
		if(children.toString() === "Dashboard"){
			return "home";
		}
		else if(children.toString() === "Milestones"){
			return "milestones";
		}
		else if(children.toString() === "FYP Groups"){
			return "fyp-groups";
		}
		else if(children.toString() === "Accounts"){
			return "accounts";
		}
		else if(children.toString() === "Chat"){
			return "chat";
		}
		else if(children.toString() === "Projects"){
			return "projects";
		}
		else if(children.toString() === "Companies"){
			return "companies";
		}
		else if(children.toString() === "Announcements"){
			return "annoucements";
		}
	}

	// Compares pagename from getPageName(route) function
	// with corrected text of side menu list item
	// returns true when equal, false otherwise
	function compareCorrectSideMenuItemTextToPagename(route, children){
		return getPagename(route) === correctMenuItemTextForComparison(children);
	}


	// Returns List Item BG Color
	// Blue when SideMenuText == Pagename
	// White when SideMenuText != Pagename
	function chooseListItemBgColor(route, children){
		return compareCorrectSideMenuItemTextToPagename(route, children) ? 'bg-blue-500' : 'bg-white';
	}


	// Returns List Item Text Color
	// White when SideMenuText == Pagename
	// Blue when SideMenuText != Pagename
	function chooseListItemTextColor(route, children){
		return compareCorrectSideMenuItemTextToPagename(route, children) ? 'text-white' : 'text-gray-500';
	}


	// Returns List Item Icon Color
	// White color when SideMenuText == Pagename
	// Blue color when SideMenuText != Pagename
	function chooseListItemIconColor(route, children){
		return compareCorrectSideMenuItemTextToPagename(route, children) ? "white" : "gray";
	}

	// Returns the type of React Icon according
	// to list item text
	// Returns: Dashboard  -> MdSpaceDashboard
	// Returns: Milestones -> GiStoneSphere
	// Returns: FYP Groups -> HiMiniUserGroup
	// Returns: Meetings   -> FaStaylinked
	function chooseListItemIcon(route, children){
		let color = chooseListItemIconColor(route, children);
		if(children.toString() === "Dashboard"){
			return (<MdSpaceDashboard color={color}/>);
		}
		else if(children.toString() === "Milestones"){
			return (<GiStoneSphere color={color}/>);
		}
		else if(children.toString() === "FYP Groups"){
			return (<HiMiniUserGroup color={color}/>);
		}
		else if(children.toString() === "Accounts"){
			return (<FaStaylinked color={color}/>);
		}
		else if(children.toString() === "Chat"){
			return (<FaRocketchat color={color}/>);
		}
		else if(children.toString() === "Projects"){
			return (<AiFillProject color={color}/>);
		}
		else if(children.toString() === "Companies"){
			return (<IoLogoAppleAr color={color}/>);
		}
		else if(children.toString() === "Announcements"){
			return (<BiAdjust color={color}/>);
		}
	}

	return (
		<div href={href} className={`${styles.sideMenuItemContainer} w-full flex flex-row items-center justify-center`}>

			<Link href={href} className={`${styles.sideMenuItemLink} h-full flex flex-row items-center justify-center rounded-lg relative `}>

				<div className={`w-full h-full flex flex-row items-center justify-center rounded-lg ${chooseListItemBgColor(route, children)} `}>

					<div className={`${styles.left} h-full flex flex-row items-center justify-center font-montserrat`}>		
						{chooseListItemIcon(route, children)}
					</div>
					
					<div className={`${styles.right} h-full flex flex-row items-center justify-start font-montserrat font-semibold tracking-wide ${chooseListItemTextColor(route, children)}`}>

						<p className={`font-montserrat`}>
							{children}
						</p>
					
					</div>
				
				</div>

				<div className={`absolute w-full h-full rounded-lg opacity-0 bg-transparent hover:bg-white hover:opacity-30`} />
			
			</Link>
			
		</div>
	);
}