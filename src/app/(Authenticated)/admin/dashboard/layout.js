import styles from "./AdminDashboard.module.css";
import Navbar from "./_components/Navbar/Navbar.jsx";
import SideMenu from "./_components/SideMenu/SideMenu.jsx";

export const metadata = {
	title: "Admin Dashboard",
	description: "Capstoned | Final Year Project (FYP) Management Platform for College & University Students.",
}

export default function AdminDashboardLayout({children}){
	return (
		<div className={`${styles.pageBodyContainer} w-full h-full flex flex-col`}>
			<div className={`${styles.navbarContainer} flex flex-row h-20`}>
				<Navbar />
			</div>
			<div 
				className={`${styles.sideMenuAndContentContainer} h-full flex flex-row`}
			>
				<div className={`${styles.sideMenuContainer} h-full `}>
					<SideMenu />
				</div>
				<div className={`${styles.contentContainer} w-full border-2 border-green-500`}>
					{children}
				</div>
			</div>
			
		</div>
	);
}