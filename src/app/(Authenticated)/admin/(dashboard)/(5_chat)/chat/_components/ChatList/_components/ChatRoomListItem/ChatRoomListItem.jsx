import styles from "./ChatRoomListItem.module.css";
import ChatRecipientAvatar from "./_components/ChatRecipientAvatar/ChatRecipientAvatar";
import ChatRecipientName from "./_components/ChatRecipientName/ChatRecipientName";
import ChatRecipientMessage from "./_components/ChatRecipientMessage/ChatRecipientMessage";

export default function ChatRoomListItem({avatar, name, message}){
    return (
        <div className={`${styles.chatListItemContainer} flex flex-row items-center w-full border-2 border-pink-500`}>

            <div className={`${styles.chatListItem} flex flex-row items-center w-full h-full `}>
                
                <ChatRecipientAvatar avatar={avatar}/>
                
                <div className={`${styles.chatRecipientNameAndMsgContainer} flex flex-col items-start justify-center w-full h-full border-2 border-green-500`}>
                    
                    <ChatRecipientName name={name}/>
                    
                    <ChatRecipientMessage message={message}/>
                
                </div>

            </div>
        
        </div>
    );
}