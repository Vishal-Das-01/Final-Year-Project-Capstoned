import styles from "./NoNotificationIcon.module.css";
import Image from "next/image";

export default function NoNotificationIcon(){
    return (
        <div className={`${styles.noNotificationPrimaryContainer} w-full h-full flex items-center justify-center `}>
            
            <div className={`${styles.noNotificationSecondaryContainer} relative w-full h-full flex items-center justify-center`}>

                <Image src={"/logo4.png"} width={150} height={150}/>

                <div className={`${styles.dialogueBox} border-2 border-blue-500`}>

                    <p className={`${styles.dialogue} font-montserrat text-blue-500`}>
                        You have no new notifications
                    </p>
                
                </div>

            </div>

        </div>
    );
}