import { SocketProvider } from "@/utils/helpers/socketProvider";
import styles from "./AdminDashboard.module.css";
import Navbar from "./_components/Navbar/Navbar.jsx";
import SideMenu from "./_components/SideMenu/SideMenu.jsx";

export const metadata = {
	title: "Admin Dashboard",
	description: "Capstoned | Final Year Project (FYP) Management Platform for College & University Students.",
}

export default function AdminDashboardLayout({children}){
	return (
		<SocketProvider>

		<div className={`${styles.pageBodyContainer} w-full h-full flex flex-col `}>

			<div className={`${styles.navbarContainer} flex flex-row h-20 hidden xl:flex`}>
				<Navbar />
			</div>
			
			<div className={`${styles.sideMenuAndContentContainer} h-full flex flex-row hidden xl:flex`}>

				<div className={`${styles.sideMenuContainer} h-full bg-white`}>
					<SideMenu />
				</div>
				
				<div className={`${styles.contentContainer} w-full bg-white rounded-tl-xl`}>
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