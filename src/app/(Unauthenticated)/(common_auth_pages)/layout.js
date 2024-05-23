import Footer from "@/app/(Unauthenticated)/_components/Footer/Footer.jsx";
import Navbar from "./_components/Navbar/Navbar";
import styles from "./CommonAuthPages.module.css";

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