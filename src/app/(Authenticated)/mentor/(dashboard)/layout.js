import { SocketProvider } from "@/utils/helpers/socketProvider";
import styles from "./MentorDashboard.module.css";
import Navbar from "./_components/Navbar/Navbar.jsx";
import SideMenu from "./_components/SideMenu/SideMenu.jsx";

export default function MentorDashboardLayout({children}){
	return (
		<SocketProvider>

		<div className={`${styles.pageBodyContainer} w-full h-full flex flex-col`}>

			<div className={`${styles.navbarContainer} flex flex-row hidden xl:flex`}>
				<Navbar />
			</div>
			
			<div className={`${styles.sideMenuAndContentContainer} overflow-hidden flex flex-row hidden xl:flex`}>

				<div className={`${styles.sideMenuContainer} bg-white`}>
					<SideMenu />
				</div>
				
				<div className={`${styles.contentContainer} w-full rounded-tl-xl overflow-y-auto`}>
					{children}
				</div>
			
			</div>

			{/* Small device message */}
			<div className="flex justify-center items-center h-full xl:hidden">
            	<div className="text-center">
              	<h1 className="text-[48px] font-exo2 font-semibold text-neutral-600">
                	CAPSTONED
              	</h1>
              	<p className="text-red-500 text-lg mt-4 font-medium">
                	We are not available on small devices
              	</p>
            	</div>
          	</div>
			
		</div>

		</SocketProvider>
	);
}