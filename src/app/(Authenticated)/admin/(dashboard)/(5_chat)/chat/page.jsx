import styles from "./ChatPage.module.css";
import ChatList from "./_components/ChatList/ChatList.jsx";

export default function ChatPage(props){
    return (
        <div className={`${styles.mainContainer} w-full h-full flex flex-row items-center justify-center`}>
            
            <div className={`${styles.secondaryContainer} flex flex-row items-center justify-center h-full border-2 border-yellow-500`}>
                
                <div className={`${styles.left}`}>

                    <ChatList />
                
                </div>

                <div className={`${styles.right} flex flex-col items-center justify-center`}>
                    
                </div>

            </div>

        </div>
    );
}