import styles from "./FormRow.module.css";

export default function FormRow({children}){
    return (
        <div className={`${styles.inputRow} flex flex-row items-center justify-between w-full my-2 px-1`}>
            {children}
        </div>
    );
}