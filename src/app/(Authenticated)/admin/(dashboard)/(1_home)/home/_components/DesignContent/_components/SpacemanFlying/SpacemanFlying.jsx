import styles from "./SpacemanFlying.module.css";
import Image from "next/image";

export default function SpacemanFlying(){
    return (
        <div className={`${styles.spacemanFlyingPrimaryContainer} w-full h-full flex items-center justify-center `}>
            
            <div className={`${styles.spacemanFlyingSecondaryContainer} relative w-full h-full flex items-center justify-center`}>

                <Image src={"/logo4.png"} width={150} height={150}/>

                <div className={`${styles.dialogueBox} border-2 border-blue-500 px-1`}>

                    <p className={`${styles.dialogue} font-montserrat text-blue-500`}>
                        Happy Managing!
                    </p>
                
                </div>

            </div>

        </div>
    );   
}