"use client";

import Link from "next/link";
import { usePathname } from 'next/navigation';
import { MdSpaceDashboard } from "react-icons/md";
import { HiMiniUserGroup } from "react-icons/hi2";
import { CgProfile } from "react-icons/cg";
import { GoProject } from "react-icons/go";
import { FaRegFileAlt } from "react-icons/fa";
import { FaRocketchat } from "react-icons/fa";
import { IoIosLogOut } from "react-icons/io";
import styles from "./SideMenuItem.module.css";


export default function SideMenuItem({href, children}){
	const route = usePathname();

	// Gets Page Name in the URL.
	function getPageName(route){
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
		else if(children.toString() === "Final Year Projects"){
			return "final-year-projects";
		}
		else if(children.toString() === "Groups"){
			return "groups";
		}
		else if(children.toString() === "My Proposals"){
			return "my-proposals";
		}
		else if(children.toString() === "Profile"){
			return "profile";
		}
		else if(children.toString() === "Chats"){
			return "chats";
		}
	}

	// Compares pagename from getPageName(route) function
	// with corrected text of side menu list item
	// returns true when equal, false otherwise
	function compareCorrectSideMenuItemTextToPageName(route, children){
		return getPageName(route).startsWith(correctMenuItemTextForComparison(children));
	}


	// Returns List Item BG Color
	// Blue when SideMenuText == Pagename
	// White when SideMenuText != Pagename
	function chooseListItemBgColor(route, children){
		return compareCorrectSideMenuItemTextToPageName(route, children) ? 'bg-blue-500' : 'bg-white';
	}


	// Returns List Item Text Color
	// White when SideMenuText == Pagename
	// Blue when SideMenuText != Pagename
	function chooseListItemTextColor(route, children){
		return compareCorrectSideMenuItemTextToPageName(route, children) ? 'text-white' : 'text-gray-500';
	}


	// Returns List Item Icon Color
	// White color when SideMenuText == Pagename
	// Blue color when SideMenuText != Pagename
	function chooseListItemIconColor(route, children){
		return compareCorrectSideMenuItemTextToPageName(route, children) ? "white" : "gray";
	}

	// Returns the type of React Icon according
	// to list item text
	// Returns: Dashboard  -> MdSpaceDashboard
	// FYP Projects -> GoProject
	// FYP Groups   -> HiMiniUserGroup
	// My Proposals -> FaRegFileAlt
	// Profile      -> CgProfile
	function chooseListItemIcon(route, children){
		let color = chooseListItemIconColor(route, children);
		if(children.toString() === "Dashboard"){
			return (<MdSpaceDashboard color={color}/>);
		}
		else if(children.toString() === "Final Year Projects"){
			return (<GoProject color={color}/>);
		}
		else if(children.toString() === "Groups"){
			return (<HiMiniUserGroup color={color}/>);
		}
		else if(children.toString() === "My Proposals"){
			return (<FaRegFileAlt color={color}/>);
		}
		else if(children.toString() === "Profile"){
			return (<CgProfile color={color}/>);
		}
		else if(children.toString() === "Chats"){
			return (<FaRocketchat color={color}/>);
		}
		else if(children.toString() === "Logout"){
			return (<IoIosLogOut color={color}/>);
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