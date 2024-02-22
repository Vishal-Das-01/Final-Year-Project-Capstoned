import Link from "next/link";
import styles from "./SideMenuItem.module.css";

export default function SideMenuItem({href, children, icon}){
	return (
		<div href={href} className={`${styles.sideMenuItemContainer} w-full flex flex-row items-center justify-center border-4 border-black`}>

			<Link href={href} className={`${styles.sideMenuItemLink} w-full h-full flex flex-row items-center justify-center hover:rounded-md border-2 border-yellow-500`}>
				
				<div className={`${styles.left} h-full flex flex-row items-center justify-center font-montserrat`}>
					{icon}
				</div>
				
				<div className={`${styles.right} h-full flex flex-row items-center justify-start font-montserrat font-semibold tracking-wide`}>
					<p>{children}</p>
				</div>
			
			</Link>
		
		</div>
	);
}