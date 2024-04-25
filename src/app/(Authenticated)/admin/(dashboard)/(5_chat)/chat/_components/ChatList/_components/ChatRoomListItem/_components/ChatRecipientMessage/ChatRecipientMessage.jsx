import styles from "./ChatRecipientMessage.module.css";

export default function ChatRecipientMessage({message}){
    return (
        <div className={`${styles.recipientMessageContainer}`}>
                    
            <p className={`${styles.recipientMessage} font-montserrat text-neutral-600`}>
                {message}
            </p>

        </div>
    );
}