import styles from "./FormNumberInput.module.css";

export default function FormNumberInput({labelText, numberInputName, placeholderText, isRequired}){
    return (
        <div className={`${styles.numberInputContainer}`}>
                    
            <label for={numberInputName} className={`${styles.numberInputLabel} font-montserrat`}>
                {labelText} {isRequired && `*`}
            </label>
            
            <br />
            
            {(isRequired) ? 
                <input 
                    type="text" 
                    name={numberInputName} 
                    id={numberInputName}
                    placeholder={placeholderText}
                    className={`${styles.numberInput}`}
                    required
                />
                :
                <input 
                    type="text" 
                    name={numberInputName} 
                    id={numberInputName}
                    placeholder={placeholderText}
                    className={`${styles.numberInput}`}
                />
            }
            

        </div>
    );
}