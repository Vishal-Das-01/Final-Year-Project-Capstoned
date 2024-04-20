import styles from "./ChatRecipientName.module.css";

export default function ChatRecipientName({name}){
    return (
        <div className={`${styles.recipientNameContainer}`}>
                        
            <p className={`${styles.recipientName}`}>
                {name}
            </p>

        </div>
    );
}