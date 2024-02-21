import styles from "./Navbar.module.css";
import Brand from "@/components/Brand/Brand.jsx";

export default function Navbar(props){
	return (
		<div className={`${styles.navbar} w-full h-full flex flex-row`}>
			<div className={`${styles.left} flex flex-row flex-1 items-center justify-start`}>
				<div className={`${styles.leftContent} w-full h-full flex flex-row items-center justify-start`}>
					<Brand href="/admin/dashboard">
						Capstoned
					</Brand>
				</div>
			</div>
			<div className={`${styles.right} flex flex-row flex-1 `}>
				<div className={`${styles.rightContentContainer} w-full h-full flex flex-row items-center justify-end border-2 border-black`}>
					<div className={`${styles.rightContent} flex flex-row items-center justify-between h-full border-2 border-red-500`}>
						<div className={`border-2 border-yellow-500`}>ASas</div>
						<div className={`border-2 border-blue-500`}>BAsas</div>
					</div>
				</div>
			</div>
		</div>
	);
}