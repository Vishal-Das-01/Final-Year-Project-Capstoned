import styles from "./ForgotPasswordLink.module.css";
import Link from "next/link";

export default function ForgotPasswordLink({href}){
	return (
		<div className={`${styles.forgotPasswordLinkWrapper} flex flex-row items-center justify-end w-full mt-1`}>
			
			<Link href={href}>

				<p className={`${styles.forgotPasswordLink} font-montserrat font-semibold hover:text-neutral-500`}>
					Forgot Password?
				</p>
			
			</Link>
		
		</div>
	);
}