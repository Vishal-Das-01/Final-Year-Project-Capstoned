import styles from "./ChatList.module.css";
import ChatHeading from "./_components/ChatHeading/ChatHeading";
import ChatRoomList from "./_components/ChatRoomList/ChatRoomList";

export default function ChatList(props){
    return (
        <div className={`${styles.primaryContainer} flex flex-col items-center justify-start`}>
            
            <ChatHeading />

            <ChatRoomList />

        </div>
    );
}