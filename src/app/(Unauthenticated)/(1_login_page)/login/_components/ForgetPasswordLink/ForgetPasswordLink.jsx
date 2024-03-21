import styles from "./ForgetPasswordLink.module.css";
import Link from "next/link";

export default function ForgetPasswordLink({href}){
	return (
		<div className={`${styles.forgetPasswordLinkWrapper} flex flex-row items-center justify-end w-full mt-1`}>
			
			<Link href={href}>

				<p className={`${styles.forgetPasswordLink} font-montserrat font-semibold hover:text-neutral-500`}>
					Forget Password?
				</p>
			
			</Link>
		
		</div>
	);
}