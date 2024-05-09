import styles from "./FormDateInput.module.css";

export default function FormDateInput({labelText, dateInputName, placeholderText, isRequired}){
    return (
        <div className={`${styles.dateInputContainer}`}>
                    
            <label htmlFor={dateInputName} className={`${styles.dateInputLabel} font-montserrat`}>
                {labelText} {isRequired && `*`}
            </label>
            
            <br />
            
            {(isRequired) ? 
                <input 
                    type="date" 
                    name={dateInputName} 
                    id={dateInputName}
                    placeholder={placeholderText}
                    className={`${styles.dateInput} font-montserrat`}
                    required
                />
                :
                <input 
                    type="date" 
                    name={dateInputName} 
                    id={dateInputName}
                    placeholder={placeholderText}
                    className={`${styles.dateInput} font-montserrat`}
                />
            }
            

        </div>
    );
}