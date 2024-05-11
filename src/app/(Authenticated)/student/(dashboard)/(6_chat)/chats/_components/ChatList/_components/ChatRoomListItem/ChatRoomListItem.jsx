"use client";

import styles from "./ChatRoomListItem.module.css";
import ChatRecipientAvatar from "./_components/ChatRecipientAvatar/ChatRecipientAvatar";
import ChatRecipientName from "./_components/ChatRecipientName/ChatRecipientName";
import ChatRecipientMessage from "./_components/ChatRecipientMessage/ChatRecipientMessage";

export default function ChatRoomListItem({avatar, name, message}){
    return (
        <div className={`${styles.chatListItemContainer} flex flex-row items-center w-full relative`}>

            <div className={`${styles.chatListItem} flex flex-row items-center w-full h-full`}>
                
                <ChatRecipientAvatar avatar={avatar}/>
                
                <div className={`${styles.chatRecipientNameAndMsgContainer} flex flex-col items-start justify-center w-full h-full  border-neutral-200`}>
                    
                    <ChatRecipientName name={name}/>
                    
                    <ChatRecipientMessage message={message}/>
                
                </div>

            </div>

            <div onClick={() => console.log("Clicked Chat")} className={`${styles.chatListItemOverlay} cursor-pointer flex flex-row items-center w-full h-full absolute bg-transparent hover:bg-neutral-200 hover:opacity-30`}/>
        
        </div>
    );
}