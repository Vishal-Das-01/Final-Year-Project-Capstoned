import styles from "./ChatList.module.css";
import ChatHeading from "./_components/ChatHeading/ChatHeading";
import ChatRoomList from "./_components/ChatRoomList/ChatRoomList";

export default function ChatList(props){
    return (
        <div className={`${styles.primaryContainer} flex flex-col items-center justify-start`}>
            
            <div className={`${styles.secondaryContainer} flex flex-col items-center justify-start`}>

                <ChatHeading />

                <div className={`${styles.tertiaryContainer} flex flex-col items-center justify-start overflow-y-auto `}>

                    <ChatRoomList />

                </div>

            </div>

        </div>
    );
}