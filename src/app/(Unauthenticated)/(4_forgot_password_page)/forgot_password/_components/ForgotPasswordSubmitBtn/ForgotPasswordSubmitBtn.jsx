import styles from "./ForgotPasswordSubmitBtn.module.css";

export default function ForgotPasswordSubmitBtn({btnText}){
	return (
		<div className={`${styles.btnContainer} h-16 flex items-center justify-center py-3`}>


				<button type="submit" className={`${styles.forgotPasswordSubmitBtn} w-full h-full font-montserrat font-semibold rounded-lg text-base tracking-widest text-white bg-black border-4 border-black hover:bg-white hover:border-4 hover:border-black hover:text-black hover:font-semibold hover:font-montserrat hover:text-base`}>

					{btnText}
				
				</button>

		
		</div>
	);
}