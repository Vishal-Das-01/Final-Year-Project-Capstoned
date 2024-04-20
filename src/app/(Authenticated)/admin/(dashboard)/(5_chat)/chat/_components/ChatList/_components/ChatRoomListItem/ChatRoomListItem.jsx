import styles from "./ChatRoomListItem.module.css";
import Image from "next/image";

export default function ChatRoomListItem({children}){
    return (
        <div className={`${styles.chatListItemContainer} flex flex-row items-center w-full border-2 border-pink-500`}>

            <div className={`${styles.chatListItem} flex flex-row items-center w-full h-full `}>
                
                <div className={`${styles.chatRecipientAvatarContainer}`}>
                    <Image className={`${styles.chatRecipientAvatar}`} src={`/picCircular.png`} width={50} height={50}/>
                </div>
                
                <div className={`${styles.chatRecipientNameAndMsgContainer} flex flex-col items-start justify-center w-full h-full border-2 border-green-500`}>
                    <p>Item 1</p>
                    <p>Message</p>
                </div>

            </div>
        
        </div>
    );
}