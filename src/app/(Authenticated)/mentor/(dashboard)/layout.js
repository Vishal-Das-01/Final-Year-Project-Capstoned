import { SocketProvider } from "@/utils/helpers/socketProvider";
import styles from "./MentorDashboard.module.css";
import Navbar from "./_components/Navbar/Navbar.jsx";
import SideMenu from "./_components/SideMenu/SideMenu.jsx";

export default function MentorDashboardLayout({children}){
	return (
		<SocketProvider>

		<div className={`${styles.pageBodyContainer} w-full h-full flex flex-col`}>

			<div className={`${styles.navbarContainer} flex flex-row`}>
				<Navbar />
			</div>
			
			<div className={`${styles.sideMenuAndContentContainer} overflow-hidden flex flex-row`}>

				<div className={`${styles.sideMenuContainer} bg-white`}>
					<SideMenu />
				</div>
				
				<div className={`${styles.contentContainer} w-full rounded-tl-xl overflow-y-auto`}>
					{children}
				</div>
			
			</div>
			
		</div>

		</SocketProvider>
	);
}