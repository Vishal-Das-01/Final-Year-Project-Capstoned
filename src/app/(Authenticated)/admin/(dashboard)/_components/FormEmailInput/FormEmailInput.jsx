import styles from "./FormEmailInput.module.css";

export default function FormEmailInput({labelText, emailInputName, placeholderText, isRequired}){
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
                    className={`${styles.emailInput}`}
                    required
                />
                :
                <input 
                    type="email" 
                    name={emailInputName} 
                    id={emailInputName}
                    placeholder={placeholderText}
                    className={`${styles.emailInput}`}
                />
            }
            

        </div>
    );
}