import styles from "./ChatMessageBubble.module.css";

export default function ChatMessageBubble({text, color}){
    return (
        <div className={`${styles.bubblePrimaryContainer} w-full border-2 border-black`}>
            
            <div className={`${styles.bubbleSecondaryContainer} bg-${`color`}-500 border-2 border-pink-500`}>
                
                <p className={`${styles.chatMessage} font-montserrat`}>
                    {text}
                </p>
            
            </div>

        </div>
    );
}