import styles from "./ChatPage.module.css";
import ChatList from "./_components/ChatList/ChatList.jsx";

export default function ChatPage(props){
    return (
        <div className={`${styles.mainContainer} w-full h-full flex flex-row items-center justify-center`}>
            
            <div className={`${styles.secondaryContainer} flex flex-row items-center justify-center h-full border-2 border-yellow-500`}>
                
                <div className={`${styles.left} border-2 border-black`}>

                    <ChatList />
                
                </div>

                <div className={`${styles.right} flex flex-col items-center justify-center border-2 border-red-500`}>
                    
                    <div className={`${styles.chatMessageDisplayBoxContainer} w-full h-full`}>

                        <div className={`${styles.chatMessageDisplayBox} flex flex-col`}>

                        </div>

                    </div>

                    <div className={`${styles.chatMessageInputFieldContainer} flex flex-row`}>

                        <input type = "text" className={`${styles.chatMessageInputField}`} />
                            
                        <div className={`${styles.chatMessageSendButtonContainer}`}>

                            <button className={`${styles.chatMessageSendButton}`}>
                                icon
                            </button>

                        </div>

                    </div>

                </div>

            </div>

        </div>
    );
}