import styles from "./FormHeading.module.css";

export default function FormHeading(){
	return (
		<div className={`flex flex-row items-center justify-center`}>

			<div className={`${styles.headingWrapper} w-full `}>
			
				<div className={`${styles.styledDivLineWrapper} flex flex-row items-center justify-center w-full`}>

					<div className={`${styles.styledDivLine}  rounded-lg`}/>

				</div>		

				<p className={`${styles.heading} font-montserrat font-normal text-2xl text-black`}>
					OTP Verification
				</p>

				<div className={`${styles.styledDivLineWrapper} flex flex-row items-center justify-center w-full`}>

					<div className={`${styles.styledDivLine}  rounded-lg`}/>
				
				</div>

			</div>

		</div>
	);
}