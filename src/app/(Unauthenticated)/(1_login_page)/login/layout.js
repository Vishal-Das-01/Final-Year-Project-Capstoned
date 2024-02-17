import Footer from "@/app/(Unauthenticated)/_components/Footer/Footer.jsx";
import Navbar from "@/app/(Unauthenticated)/_components/Navbar/Navbar.jsx";
import styles from "./LoginPage.module.css";

export const metadata = {
  title: "Capstoned",
  description: "Capstoned Login Page | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function LandingPageLayout({children}){
	return (
		<div className={`${styles.loginPage} h-full w-full flex flex-col `}>
			<Navbar />
			<div className="h-full w-full">
				{children}
			</div>
			<Footer />
		</div>
	);
}