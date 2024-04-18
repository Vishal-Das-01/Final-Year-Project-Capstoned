import Image from "next/image";
import Link from "next/link";
import styles from "./MessageListTile.module.css";

export default function MessageListTile({name, unreadMsgCount, imgSrc, href}){
    return (
        
        <div className={`${styles.messageListTileWrapper} w-full mb-2 hover:bg-neutral-200 rounded-lg`}>

            <Link href={href} className={`w-full `}>

                <div className={`${styles.tileContentWrapper} w-full flex flex-row items-center `}>
                    
                    <div className={`${styles.imgWrapper} rounded-full flex flex-row items-center justify-center mr-1 `}>

                        <Image 
                            className={`${styles.img} rounded-full`} 
                            src={imgSrc} 
                            height={33} 
                            width={33} 
                        />

                    </div>

                    <div className={`${styles.nameAndUnreadMessagesCountWrapper} flex flex-col items-start justify-center `}>

                        <div className={`${styles.nameWrapper}`}>

                            <p className={`${styles.name} font-montserrat`}>
                                {name}
                            </p>

                        </div>

                        <div className={`${styles.unreadMessagesCountWrapper}`}>

                            <p className={`${styles.unreadMessagesCount} font-montserrat text-neutral-500`}>
                                {unreadMsgCount} messages.
                            </p>
                        
                        </div>

                    </div>
                
                </div>

                <hr className={`${styles.divider}`}/>

            </Link>

        </div>

    );
}