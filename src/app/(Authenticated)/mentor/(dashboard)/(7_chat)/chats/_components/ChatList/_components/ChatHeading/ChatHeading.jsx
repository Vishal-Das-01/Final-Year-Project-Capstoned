import styles from "./ChatHeading.module.css";

export default function ChatHeading(props){
    return (
        <div className={`${styles.chatHeadingContainer} w-full `}>
            
            <p className={`${styles.chatHeading} pl-2 py-1 text-black text-xl font-montserrat font-semibold`}>
                Chat
            </p>
            
        </div>
    );
}