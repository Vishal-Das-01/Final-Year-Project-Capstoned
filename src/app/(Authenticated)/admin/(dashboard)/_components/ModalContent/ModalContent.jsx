import styles from "./ModalContent.module.css";

export default function ModalContent({children}){
    return (
        <div className={`${styles.modalContentContainer} my-6`}>
            {children}
        </div>
    );
}