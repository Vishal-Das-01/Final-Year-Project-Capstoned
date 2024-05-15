import styles from "./FormDropDownSelect.module.css";
import { useEffect, useState } from "react";

export default function FormDropDownSelect({labelText, dropDownSelectName, options, isRequired, placeholder, selectedValue, setSelectedValue, isOnChangePassed, onChange}){
    // This is this component's own internal state
    // It is only used for displaying the selected value in the drop down
    const [selectedDropDownValue, setSelectedDropDownValue] = useState(selectedValue);

    // Function called when drop down value is selected
    // sets state of this component's own internal state
    // and sets state of parent component that uses this FormDropDownSelect as a child component
    function onDropDownValueSelected(event){
        setSelectedValue(event.target.value.toLowerCase());
        setSelectedDropDownValue(event.target.value);
    }

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
                    value={(isOnChangePassed) ? selectedValue : selectedDropDownValue}
                    onChange={(isOnChangePassed) ? onChange : onDropDownValueSelected}
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
                    value={(isOnChangePassed) ? selectedValue : selectedDropDownValue}
                    onChange={(isOnChangePassed) ? onChange : onDropDownValueSelected}
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