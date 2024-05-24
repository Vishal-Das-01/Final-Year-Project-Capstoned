import styles from "./APILoadingButton.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function APILoadingButton({width}){
    return (
        <div 
            className={`${styles.apiLoadingButtonContainer} flex items-center justify-center`} 
            style={{width: `${width}`,  height: "36px"}}
        >

            <button className={`flex flex-row p-1 items-center justify-center w-full h-full font-montserrat font-semibold rounded-lg text-sm tracking-widest text-white bg-black border-4 border-black hover:bg-white hover:border-4 hover:border-black hover:text-black`} >
                
                <div className={`animate-spin`}>

                    <AiOutlineLoading3Quarters style={{ fontSize: "25px" }}/>

                </div>

            </button>

        </div>
    );
}