import styles from "./LoginInput.module.css";

export default function LoginInput({label, inputType, inputPlaceholder}){
	return (
		<div className="flex flex-col w-full border-2 border-black my-2">
			<label className="font-semibold font-montserrat">
				{label}
			</label>
			<input 
				className="border-2 border-yellow-500 outline-none" 
				type={inputType} 
				placeholder={inputPlaceholder}
			/>
		</div>
	);
}