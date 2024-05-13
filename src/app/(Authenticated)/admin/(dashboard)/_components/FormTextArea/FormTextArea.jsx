import styles from "./FormTextArea.module.css";

export default function FormTextArea({labelText, textAreaName, placeholderText, isRequired, value, onChange}){
    return (
        <div className={`${styles.textAreaContainer} `}>
                    
            <label htmlFor={textAreaName} className={`${styles.textAreaLabel} font-montserrat`}>
                {labelText} {isRequired && `*`}
            </label>
            
            <br />
            
            {(isRequired) ? 
                <textarea 
                    type="email" 
                    name={textAreaName} 
                    id={textAreaName}
                    placeholder={placeholderText}
                    className={`${styles.textArea} font-montserrat`}
                    required
                    rows={9}
                    cols={35}
                    value={value}
                    onChange={onChange}
                />
                :
                <textarea 
                    type="email" 
                    name={textAreaName} 
                    id={textAreaName}
                    placeholder={placeholderText}
                    className={`${styles.textArea} font-montserrat`}
                    rows={9}
                    cols={35}
                    value={value}
                    onChange={onChange}
                />
            }
            
        </div>
    );
}