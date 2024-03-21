import styles from "./LoginInput.module.css";

export default function LoginInput({label, inputType, inputPlaceholder}){
	return (
		<div className={`${styles.inputContainer} flex flex-col mt-2`}>

			
			
			<input 
				className={`${styles.input}  text-lg  bg-transparent flex justify-center`} 
				type={inputType} 
				placeholder={inputPlaceholder}
			/>
		
		</div>
	);
}