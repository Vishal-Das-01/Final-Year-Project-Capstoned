import styles from "./FormEmailInput.module.css";

export default function FormEmailInput({labelText, emailInputName, placeholderText, isRequired, value, onChange}){
    return (
        <div className={`${styles.emailInputContainer} `}>
                    
            <label htmlFor={emailInputName} className={`${styles.emailInputLabel} font-montserrat`}>
                {labelText} {isRequired && `*`}
            </label>
            
            <br />
            
            {(isRequired) ? 
                <input 
                    type="email" 
                    name={emailInputName} 
                    id={emailInputName}
                    placeholder={placeholderText}
                    className={`${styles.emailInput} font-montserrat`}
                    required
                    value={value}
                    onChange={onChange}
                />
                :
                <input 
                    type="email" 
                    name={emailInputName} 
                    id={emailInputName}
                    placeholder={placeholderText}
                    className={`${styles.emailInput} font-montserrat`}
                    value={value}
                    onChange={onChange}
                />
            }
            
        </div>
    );
}