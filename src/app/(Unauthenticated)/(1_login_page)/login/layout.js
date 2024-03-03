import Footer from "@/app/(Unauthenticated)/_components/Footer/Footer.jsx";
import Navbar from "@/app/(Unauthenticated)/(1_login_page)/_components/Navbar/Navbar.jsx";
import styles from "./LoginPage.module.css";

export default function Layout({children}){
	return (
		<div className={`${styles.mainWrapper} h-full w-full flex flex-col`}>
			<Navbar />
			<div className="h-full w-full">
				{children}
			</div>
			<Footer />
		</div>
	);
}