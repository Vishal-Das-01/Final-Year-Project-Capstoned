import styles from "./FormDropDownSelect.module.css";

export default function FormDropDownSelect({labelText, dropDownSelectName, options, isRequired, placeholder}){
    return ( 
        <div className={`${styles.dropDownSelectContainer} `}>
                    
            <label htmlFor={dropDownSelectName} className={`${styles.dropDownSelectLabel} font-montserrat`}>
                {labelText} {isRequired && `*`}
            </label>
            
            <br />
            
            {(isRequired) ? 
                
                <select  
                    name={dropDownSelectName} 
                    id={dropDownSelectName}
                    className={`${styles.dropDownSelect} font-montserrat`}
                    required
                    defaultValue=""
                >
                    
                    <option value="" disabled>
                        {placeholder}
                    </option>

                    {options.map((option) => {
                        return (<option value={option} key={option} className="font-montserrat">
                                    {option}
                                </option>)
                    })}
                    
                </select>
                :

                <select 
                    name={dropDownSelectName} 
                    id={dropDownSelectName}
                    className={`${styles.dropDownSelect} font-montserrat`}
                    defaultValue=""
                >
                    
                    <option value="" disabled>
                        {placeholder}
                    </option>

                    {options.map((option) => {
                        return (<option value={option} key={option} className="font-montserrat">
                                    {option}
                                </option>)
                    })}

                </select>
            }
            
        </div>
    );
}