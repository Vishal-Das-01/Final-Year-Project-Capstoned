import styles from "./ChatMessageBubble.module.css";
import Image from "next/image";

export default function ChatMessageBubble({text, recipient, name, role, imageSrc}){
    return (
        <div className={`${styles.bubblePrimaryContainer} flex flex-row items-center ${(recipient == true) ? `justify-start` : ` justify-end`} w-full  my-1 py-1`}>
            
            <div className={`${styles.bubbleSecondaryContainer} flex ${(recipient == true) ? `flex-row` : `flex-row-reverse`}  items-start justify-between`}>
                
                <div className={`${styles.messageOwnerAvatarContainer} ${(recipient == true) ? `mr-2` : `ml-2`}`}>
                
                    <Image className={`${styles.messageOwnerAvatar} rounded-full`} alt="Participant image" src={imageSrc} height={35} width={35}/> 
                
                </div>

                <div className={`${styles.bubbleTertiaryContainer} flex flex-col w-full h-full bg-white ${(recipient == true) ? `rounded-tr-lg` : `rounded-tl-lg`} border-2 border-black`}>
                    
                    <p className={`${styles.messageOwnerName} font-montserrat ${(recipient == true) ? `text-blue-700` : `text-green-700`} font-semibold`}>
                        {name + " (" + role + ")"}
                    </p>

                    <p className={`${styles.chatMessage} font-montserrat `}>
                        {text}
                    </p>

                </div>                

                
            
            </div>

        </div>
    );
}