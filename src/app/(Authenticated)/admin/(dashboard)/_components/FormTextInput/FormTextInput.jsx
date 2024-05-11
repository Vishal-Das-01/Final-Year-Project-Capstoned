import styles from "./FormTextInput.module.css";

export default function FormTextInput({labelText, textInputName, placeholderText, isRequired}){
    return (
        <div className={`${styles.textInputContainer} `}>
                    
            <label htmlFor={textInputName} className={`${styles.textInputLabel} font-montserrat`}>
                {labelText} {isRequired && `*`}
            </label>
            
            <br />
            
            {(isRequired) ? 
                <input 
                    type="text" 
                    name={textInputName} 
                    id={textInputName}
                    placeholder={placeholderText}
                    className={`${styles.textInput} font-montserrat`}
                    required
                />
                :
                <input 
                    type="text" 
                    name={textInputName} 
                    id={textInputName}
                    placeholder={placeholderText}
                    className={`${styles.textInput} font-montserrat`}
                />
            }
            

        </div>
    );
}