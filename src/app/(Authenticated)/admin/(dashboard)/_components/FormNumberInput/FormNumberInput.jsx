import styles from "./FormNumberInput.module.css";

export default function FormNumberInput({labelText, numberInputName, placeholderText, isRequired, value, onChange}){
    return (
        <div className={`${styles.numberInputContainer} `}>
                    
            <label htmlFor={numberInputName} className={`${styles.numberInputLabel} font-montserrat`}>
                {labelText} {isRequired && `*`}
            </label>
            
            <br />
            
            {(isRequired) ? 
                <input 
                    type="number" 
                    name={numberInputName} 
                    id={numberInputName}
                    placeholder={placeholderText}
                    className={`${styles.numberInput} font-montserrat`}
                    required
                    value={value}
                    onChange={onChange}
                />
                :
                <input 
                    type="number" 
                    name={numberInputName} 
                    id={numberInputName}
                    placeholder={placeholderText}
                    className={`${styles.numberInput} font-montserrat`}
                    value={value}
                    onChange={onChange}
                />
            }
            
        </div>
    );
}