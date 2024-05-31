import styles from "./ChatPage.module.css";
import ChatList from "./_components/ChatList/ChatList.jsx";
import ChatMessageDisplayBox from "./_components/ChatMessageDisplayBox/ChatMessageDisplayBox.jsx";
import ChatMessageInputField from "./_components/ChatMessageInputField/ChatMessageInputField.jsx";

export default function ChatPage(props){
    return (
        <div className={`${styles.mainContainer} w-full h-full flex flex-row items-center justify-center`}>
            
            <div className={`${styles.secondaryContainer} flex flex-row items-center justify-evenly h-full `}>
                
                <div className={`${styles.left}`}>

                    <ChatList />
                
                </div>

                <div className={`${styles.right} flex flex-col items-center justify-between `}>
                    
                    <ChatMessageDisplayBox />

                    <ChatMessageInputField />

                </div>

            </div>

        </div>
    );
}