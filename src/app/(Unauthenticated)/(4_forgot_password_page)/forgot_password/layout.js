import Footer from "@/app/(Unauthenticated)/_components/Footer/Footer.jsx";
import Navbar from "@/app/(Unauthenticated)/(4_forgot_password_page)/_components/Navbar/Navbar.jsx";
import styles from "./ForgotPasswordPage.module.css";

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