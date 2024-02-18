import styles from "./LoginSubmitBtn.module.css";

export default function LoginSubmitBtn({btnText}){
	return (
		<div className={`${styles.btnContainer} flex items-center justify-center py-2  `}>
			<div className={`${styles.secondaryContainer} h-full`}>
				<button className={`${styles.loginSubmitBtn} font-montserrat font-semibold text-white bg-black rounded-xl text-base tracking-widest border-4 border-black hover:bg-white hover:border-4 hover:border-black hover:text-black hover:font-semibold hover:font-montserrat hover:text-base`}>
					{btnText}
				</button>
			</div>
		</div>
	);
}