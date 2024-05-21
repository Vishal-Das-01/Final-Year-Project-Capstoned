import styles from "./ModalContentHeading.module.css";

export default function ModalContentHeading({children}){
    return (
        <div className={`${styles.headingContainer} mb-1`}>
            
            <p className={`${styles.heading} font-montserrat font-medium text-black`}>

                {children}
            
            </p>
        
        </div>
    );
}