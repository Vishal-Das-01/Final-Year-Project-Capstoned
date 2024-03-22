"use client"
import styles from "./LoginInput.module.css";

export default function LoginInput({label, inputType, inputPlaceholder, value, setValue}){
	return (
		<div className={`${styles.inputContainer} flex flex-col mt-2`}>

			
			
			<input 
				className={`${styles.input}  text-lg  bg-transparent flex justify-center`} 
				type={inputType} 
				placeholder={inputPlaceholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		
		</div>
	);
}