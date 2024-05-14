"use client";

import styles from "./FormDateInput.module.css";
import { useState, useEffect } from "react";

export default function FormDateInput({labelText, dateInputName, placeholderText, isRequired, setState}){
    const [fieldName, setFieldName] = useState("");
    const [selectedDate, setSelectedDate] = useState("");
    
    function chooseDate(event){
        setFieldName(event.target.name);
        setSelectedDate(event.target.value);
    }

    useEffect(() => {
        if(fieldName === "deadline"){
            setState((prev) => ({
                ...prev,
                "deadline" : selectedDate
            }));
        }
    }, [selectedDate])

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
                    value={selectedDate}
                    onChange={chooseDate}
                />
                :
                <input 
                    type="date" 
                    name={dateInputName} 
                    id={dateInputName}
                    placeholder={placeholderText}
                    className={`${styles.dateInput} font-montserrat`}
                    value={selectedDate}
                    onChange={chooseDate}
                />
            }
            

        </div>
    );
}