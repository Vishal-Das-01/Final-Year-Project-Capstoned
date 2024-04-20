import styles from "./ChatRecipientMessage.module.css";

export default function ChatRecipientMessage({message}){
    return (
        <div className={`${styles.recipientMessageContainer}`}>
                    
            <p className={`${styles.recipientMessage}`}>
                {message}
            </p>

        </div>
    );
}