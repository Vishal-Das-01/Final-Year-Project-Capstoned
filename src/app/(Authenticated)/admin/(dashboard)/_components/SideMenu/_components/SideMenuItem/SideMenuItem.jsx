import Link from "next/link";
import styles from "./SideMenuItem.module.css";

export default function SideMenuItem({href, children, icon}){
	return (
		<div href={href} className={`${styles.sideMenuItemContainer} w-full flex flex-row items-center justify-center`}>

			<Link href={href} className={`${styles.sideMenuItemLink} h-full flex flex-row items-center justify-center rounded-lg relative `}>

				<div className={`w-full h-full flex flex-row items-center justify-center rounded-lg bg-black `}>

					<div className={`${styles.left} h-full flex flex-row items-center justify-center font-montserrat`}>
						<i className={`text-color-500`}>{icon}</i>
					</div>
					
					<div className={`${styles.right} h-full flex flex-row items-center justify-start font-montserrat font-semibold tracking-wide text-blue-500`}>
						<p className={`font-montserrat`}>{children}</p>
					</div>
				
				</div>

				<div className={`absolute w-full h-full rounded-lg opacity-0 bg-transparent hover:bg-neutral-500 hover:opacity-30`} />
			
			</Link>
			
		</div>
	);
}