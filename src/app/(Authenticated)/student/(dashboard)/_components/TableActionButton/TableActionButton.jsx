"use client";

import styles from "./TableActionButton.module.css";
import { IoAdd } from "react-icons/io5";

export default function TableActionButton({children, onClickAction}){
    return (
        <div className={`${styles.tableActionButtonContainer}`}>

            <button className={`${styles.tableActionButton} flex flex-row p-1 items-center justify-center w-full h-full font-montserrat font-semibold rounded-lg text-sm tracking-widest text-white bg-black border-4 border-black hover:bg-white hover:border-4 hover:border-black hover:text-black`} onClick={onClickAction} >
                
                <IoAdd className="mr-2 w-4 h-4" />
                
                {children}

            </button>

        </div>
    );
}

