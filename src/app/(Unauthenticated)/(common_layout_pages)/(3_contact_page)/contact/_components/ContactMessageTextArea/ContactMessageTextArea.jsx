import styles from "./ContactMessageTextArea.module.css";

export default function ContactMessageTextArea(props){
    return (
        <div className={`${styles.textAreaContainer} mt-2 w-full flex flex-row items-center justify-center  font-montserrat`}>

            <textarea className={`${styles.textArea} outline-none text-lg`} placeholder="Message">

            </textarea>
        
        </div>
    );
}