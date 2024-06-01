import styles from "./ModalContentText.module.css";

export default function ModalContentText({children}){
    return (

        <div className={`${styles.contentTextContainer} `}>

            <p className={`${styles.contentText} font-montserrat text-neutral-500`}>
                        
                {children}
                    
            </p>

        </div>
    );
}