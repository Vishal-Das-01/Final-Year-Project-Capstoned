import styles from "./LoadingIndicator.module.css";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

export default function LoadingIndicator(props){
    return (
        <div className={`${styles.primaryContainer} flex items-center justify-center`}>

            <div className={`animate-spin`}>

                <AiOutlineLoading3Quarters style={{ color: "#3B82F6", fontSize: "40px" }}/>

            </div>

        </div>
    );
}