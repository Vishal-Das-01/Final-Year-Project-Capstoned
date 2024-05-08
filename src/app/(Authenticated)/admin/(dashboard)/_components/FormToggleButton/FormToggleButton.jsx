"use client";

import styles from "./FormToggleButton.module.css";
import ToggleButton from 'react-toggle-button';
import { VscDebugBreakpointLogUnverified } from "react-icons/vsc";
import { useState } from "react";

export default function FormToggleButton({inactiveLabelText, activeLabelText, isRequired, labelText, toggleInputName}){
    const [isChecked, setIsChecked] = useState(false);

    const toggleSwitch = () => {
        setIsChecked(!isChecked);
    };

    return (
        <div className={`${styles.toggleButtonPrimaryContainer} flex flex-row items-center justify-start h-10 `}>

            <label htmlFor={toggleInputName} className={`${styles.toggleButtonLabel} font-montserrat mr-4`}>
                {labelText} {isRequired && `*`}
            </label>
            
            <label className="flex items-center space-x-2 cursor-pointer">

                <div className={`relative w-12 h-6 bg-gray-300 rounded-full shadow-inner transition duration-300 ease-in-out ${isChecked ? 'bg-blue-400' : 'bg-slate-950'}`}>
                    <div className={`absolute w-6 h-6 bg-white rounded-full shadow-md transform transition duration-300 ease-in-out ${isChecked ? 'translate-x-full' : 'translate-x-0'}`} />
                </div>

                <span className="text-sm font-medium">{isChecked ? activeLabelText : inactiveLabelText}</span>

                {(isRequired) ? 
                    <input name={toggleInputName} id={toggleInputName} type="checkbox" className="hidden" onChange={toggleSwitch} checked={isChecked} required/>
                    :
                    <input name={toggleInputName} id={toggleInputName} type="checkbox" className="hidden" onChange={toggleSwitch} checked={isChecked} />
                }

            </label>

        </div>
    );
}