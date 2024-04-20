import styles from "./ChatRoomList.module.css";
import ChatRoomListItem from "../ChatRoomListItem/ChatRoomListItem";

export default function ChatRoomList(props){
    return (
        <div className={`${styles.chatListContainer} w-full h-full`}>

            <div className={`${styles.chatList} flex flex-col items-center justify-start w-full`}>

                <ChatRoomListItem avatar={"/picCircular.png"} name={"Hamza Akbar"} message={`Hello`}/>
                

                <ChatRoomListItem avatar={"/picCircular.png"} name={"Hamza Akbar"} message={`Hello`}/>
                

                <ChatRoomListItem avatar={"/picCircular.png"} message={`Hello`} name={"Hamza Akbar"}/>
                

            </div>

        </div>
    );
}