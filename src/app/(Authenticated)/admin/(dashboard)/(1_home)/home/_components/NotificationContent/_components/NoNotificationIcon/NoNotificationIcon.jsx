import styles from "./NoNotificationIcon.module.css";
import Image from "next/image";

export default function NoNotificationIcon(){
    return (
        <div className={`${styles.noNotificationPrimaryContainer} w-full h-full flex items-center justify-center `}>
            
            <div className={`${styles.noNotificationSecondaryContainer} relative w-full h-full flex items-center justify-center`}>

                <div className={`${styles.dialogueBox} w-full h-[200px]  flex items-center justify-center`}>

                    <p className={`${styles.dialogue} font-montserrat text-blue-500 `}>
                        You have no new notifications.
                    </p>
                
                </div>

            </div>

        </div>
    );
}