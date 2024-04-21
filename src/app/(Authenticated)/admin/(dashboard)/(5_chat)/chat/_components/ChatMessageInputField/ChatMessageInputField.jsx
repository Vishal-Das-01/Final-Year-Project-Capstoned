import styles from "./ChatMessageInputField.module.css";
import { FaPlay } from "react-icons/fa";

export default function ChatMessageInputField(props){
    return (
        <div className={`${styles.chatMessageInputFieldContainer} flex flex-row items-end justify-between w-full `}>

            <input type = "text" className={`${styles.chatMessageInputField} w-full`} />
                
            <div className={`${styles.chatMessageSendButtonContainer}`}>

                <button className={`${styles.chatMessageSendButton} flex flex-row bg-blue-500 items-center justify-center rounded-full`}>
                    <FaPlay style={{ color: "white", fontSize: "20px" }}/>
                </button>

            </div>

        </div>
    );
}