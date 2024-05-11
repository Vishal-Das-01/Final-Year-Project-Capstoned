import styles from "./ContactInput.module.css";

export default function ContactInput({inputType, inputPlaceholder}){
    return (
        <div className={`${styles.contactInputContainer} flex flex-row items-center justify-center mt-2 mb-4`}>

            <input 
				className={`${styles.contactInput}  text-lg bg-transparent focus:border-blue-300  font-montserrat`} 
				type={inputType} 
				placeholder={inputPlaceholder}
			/>
        
        </div>
    );
}