import Link from "next/link";
import styles from "./EnterCapstonedBtn.module.css";

export default function EnterCapstonedBtn({children, href}){
	return (
		<div className="flex items-center justify-center w-full h-20">
			
			<Link href={href}>
			
				<div className={`${styles.enterCapstonedBtn} py-2 px-4 bg-white rounded-lg text-black border-4 border-black hover:bg-black hover:text-white hover:border-4 hover:border-black`}>
					
					<p className={`text-xl font-montserrat font-semibold`}>
						{children}
					</p>

				</div>

			</Link>

		</div>
	);
}

/*
<div className={`${styles.enterCapstonedBtn} py-2 px-4 bg-blue-500 rounded-lg text-white border-4 border-blue-500 hover:bg-white hover:text-blue-500 hover:border-4 hover:border-blue-500`}>
*/