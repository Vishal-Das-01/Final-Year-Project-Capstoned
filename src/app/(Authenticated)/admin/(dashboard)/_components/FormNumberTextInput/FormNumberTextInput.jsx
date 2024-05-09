import styles from "./FormNumberTextInput.module.css";

export default function FormNumberTextInput({labelText, numberTextInputName, placeholderText, isRequired}){
    return (
        <div className={`${styles.numberTextInputContainer} `}>
                    
            <label htmlFor={numberTextInputName} className={`${styles.numberTextInputLabel} font-montserrat`}>
                {labelText} {isRequired && `*`}
            </label>
            
            <br />
            
            {(isRequired) ? 
                <input 
                    type="text" 
                    name={numberTextInputName} 
                    id={numberTextInputName}
                    placeholder={placeholderText}
                    className={`${styles.numberTextInput}`}
                    required
                />
                :
                <input 
                    type="text" 
                    name={numberTextInputName} 
                    id={numberTextInputName}
                    placeholder={placeholderText}
                    className={`${styles.numberTextInput}`}
                />
            }
            

        </div>
    );
}