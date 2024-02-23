import styles from "./Navbar.module.css";
import Brand from "@/components/Brand/Brand.jsx";
import Avatar from "./_components/Avatar/Avatar.jsx";
import NotificationIcon from "./_components/NotificationIcon/NotificationIcon.jsx";

export default function Navbar(props){
	return (
		<div className={`${styles.navbar} w-full h-full flex flex-row`}>
			<div className={`${styles.left} flex flex-row flex-1 items-center justify-start`}>
				<div className={`${styles.leftContent} w-full h-full flex flex-row items-center justify-start`}>
					<Brand href="/admin/home">
						Capstoned
					</Brand>
				</div>
			</div>
			<div className={`${styles.right} flex flex-row flex-1 `}>
				<div className={`${styles.rightContentContainer} w-full h-full flex flex-row items-center justify-end `}>
					<div className={`${styles.rightContent} flex flex-row items-center justify-between h-full `}>
						<NotificationIcon />
						<Avatar 
							alt="Profile Picture"
							src="/picCircular.png"
						/>
					</div>
				</div>
			</div>
		</div>
	);
}