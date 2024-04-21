import styles from "./ChatRecipientAvatar.module.css";
import Image from "next/image";

export default function ChatRecipientAvatar({avatar}){
    return (
        <div className={`${styles.chatRecipientAvatarContainer} p-2 `}>
                    
            <Image 
                className={`${styles.chatRecipientAvatar}`} 
                src={avatar} 
                width={55} 
                height={55}
            />
        
        </div>
    );
}