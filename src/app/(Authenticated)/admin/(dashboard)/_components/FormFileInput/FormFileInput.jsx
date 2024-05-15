"use client";

import styles from "./FormFileInput.module.css";
import { useEffect, useState } from "react";

export default function FormFileInput({isRequired, labelText, fileInputName, acceptableFiles, setState}){
    const [uploadedFile, setUploadedFile] = useState(null);
    const [fieldName, setFieldName] = useState("");

    function onFileUpload(event){
        setFieldName(event.target.name);
        setUploadedFile(event.target.files[0]);
    }

    useEffect(() => {
        if(fieldName === "companyProfileImage"){
            setState((prevCompany) => ({
                ...prevCompany,
                "profileImage" : uploadedFile
            }));
        }
    }, [uploadedFile])

    return (
        <div className={`${styles.fileInputPrimaryContainer}`}>

            <label htmlFor={fileInputName} className="font-montserrat block mb-3 text-black font-montserrat">
                {labelText} {isRequired && `*`}
            </label>

            {(isRequired) ? 
                <input
                    className={`${styles.fileInput} font-montserrat mb-8 block w-1/2 text-xs text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none`}
                    id={fileInputName}
                    type="file"
                    onChange={onFileUpload}
                    required
                    accept={acceptableFiles}
                    name={fileInputName}
                />
                :
                <input
                    className={`${styles.fileInput} font-montserrat mb-8 block w-1/2 text-xs text-black border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none`}
                    id={fileInputName}
                    type="file"
                    onChange={onFileUpload}
                    accept={acceptableFiles}
                    name={fileInputName}
                />
            }

        </div>
    );
}