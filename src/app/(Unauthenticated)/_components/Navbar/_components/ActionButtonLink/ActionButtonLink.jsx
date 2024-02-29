import Link from "next/link";
import styles from "./ActionButtonLink.module.css";

export default function ActionButtonLink({children, href, filled}){
	return (
		<Link href={href}>
			<div className={`${styles.actionButtonLinkDiv} flex items-center justify-center px-4 rounded-lg mx-4 border-4 border-black hover:bg-black hover:border-black hover:text-white `}>
				<p className={`text-base font-semibold font-montserrat text-black}`}>
					{children}
				</p>
			</div>
		</Link>
	);
}

/* 
<div className={`${styles.actionButtonLinkDiv} flex items-center justify-center px-4 border-4 border-blue-500 rounded-lg mx-4 ${filled ? "bg-blue-500 hover:bg-blue-400 hover:border-blue-400" : "bg-white hover:bg-slate-200"}`}>
*/