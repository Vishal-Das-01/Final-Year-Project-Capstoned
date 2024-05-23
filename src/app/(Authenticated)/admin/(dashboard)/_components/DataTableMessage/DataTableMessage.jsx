import styles from "./DataTableMessage.module.css";

export default function DataTableMessage({children}){
    return (
        <div className={`${styles.messageContainer} flex items-center justify-center w-full font-montserrat`}>
								
            <p className={`text-neutral-700`}>
                {children}
            </p>
        
        </div>
    );
}