import styles from "./ChatRecipientAvatar.module.css";
import Image from "next/image";

export default function ChatRecipientAvatar({avatar}){
    return (
        <div className={`${styles.chatRecipientAvatarContainer}`}>
                    
            <Image 
                className={`${styles.chatRecipientAvatar}`} 
                src={avatar} 
                width={50} 
                height={50}
            />
        
        </div>
    );
}