"use client"
import styles from "./TextInput.module.css";

export default function TextInput({label, inputType, inputPlaceholder, value, setValue}){
	return (
		<div className={`${styles.inputContainer} flex flex-col mt-2`}>
			
			<input 
				className={`${styles.input}  text-lg  bg-transparent flex justify-center  font-montserrat focus:ring-0 focus:outline-none`} 
				type={inputType} 
				placeholder={inputPlaceholder}
				value={value}
				onChange={(e) => setValue(e.target.value)}
			/>
		
		</div>
	);
}