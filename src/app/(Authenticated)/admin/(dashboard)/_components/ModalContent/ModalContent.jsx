import styles from "./ModalContent.module.css";

export default function ModalContent({children}){
    return (
        <div className={`my-6`}>
            {children}
        </div>
    );
}