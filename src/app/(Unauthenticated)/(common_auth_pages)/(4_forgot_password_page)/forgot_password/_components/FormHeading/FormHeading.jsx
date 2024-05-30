import styles from "./FormHeading.module.css";

export default function FormHeading(){
	return (
		<div className={`flex flex-row items-center justify-center mb-5`}>

			<div className={`${styles.headingWrapper} w-full `}>
			
				<div className={`${styles.styledDivLineWrapper} flex flex-row items-center justify-end w-full`}>

					<div className={`${styles.secondStyledDivLine}  rounded-lg`}/>

				</div>

				<p className={`${styles.heading} font-montserrat font-normal text-2xl text-black`}>
					Forgot Password?
				</p>

				<div className={`${styles.secondStyledDivLineWrapper} flex flex-row items-center justify-start w-full`}>

					<div className={`${styles.styledDivLine}  rounded-lg`}/>
				
				</div>

			</div>

		</div>
	);
}