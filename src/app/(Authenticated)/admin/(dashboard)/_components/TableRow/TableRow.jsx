"use client";

import styles from "./TableRow.module.css";

export default function TableRow({children}){
    return (
        <tr 
            className="border-b dark:border-gray-700 hover:bg-gray-100 cursor-pointer"  
            onClick={() => console.log("Row clicked")}
        >
                     
            {children}
            
        </tr>
    );
}