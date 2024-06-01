import styles from "./NotificationListTile.module.css";
import Link from "next/link";

export default function NotificationListTile({notificationText}){
    return (
        <div className={`${styles.notificationListTileWrapper} w-full mb-2 hover:bg-neutral-200 rounded-lg`}>

           

                <div className={`${styles.tileContentWrapper} w-full flex flex-row items-center pl-2 text-ellipsis overflow-hidden whitespace-nowrap`}>

                    <div className={`${styles.notificationTextWrapper} flex flex-col items-start justify-center `}>

                        <div className={`${styles.notificationWrapper} `}>

                            <p className={`${styles.notificationText} font-montserrat text-neutral-500`}>
                                {notificationText}
                            </p>

                        </div>

                    </div>
                
                </div>

                <hr className={`${styles.divider}`}/>

          

        </div>
    );
}