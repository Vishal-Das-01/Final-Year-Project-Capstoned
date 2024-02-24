import ContentCard from "./_components/ContentCard/ContentCard.jsx";
import styles from "./AdminHomePage.module.css";

export const metadata = {
	title: "Admin Home",
	description: "Capstoned Admin Home | Final Year Project (FYP) Management Platform for College & University Students.",
}

export default function AdminDashboardHomePage(props){
	return (
		<div className={`${styles.pageContainer} w-full h-full flex flex-row items-center justify-center border-2 border-green-500`}>
			
			<div className={`${styles.primaryContainer} overflow-auto flex flex-row `}>
				
				<div className={`${styles.left} w-full h-full flex flex-col flex-1 border-2 border-pink-500`}>
					Left
				</div>

				<div className={`${styles.right} w-full h-full flex flex-col flex-1 border-2 border-yellow-500`}>
					Right
				</div>

			</div>
		
		</div>
	);
}