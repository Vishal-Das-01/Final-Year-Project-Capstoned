import styles from "./LoginInput.module.css";

export default function LoginInput({label, inputType, inputPlaceholder}){
	return (
		<div className={`${styles.inputContainer} flex flex-col  my-2`}>
			<label className={`${styles.label} font-medium font-montserrat text-neutral-600 text-lg`}>
				{label}
			</label>
			<input 
				className={`${styles.input} px-2 text-lg rounded-xl outline-none border-2 border-neutral-500 flex justify-center`} 
				type={inputType} 
				placeholder={inputPlaceholder}
			/>
		</div>
	);
}