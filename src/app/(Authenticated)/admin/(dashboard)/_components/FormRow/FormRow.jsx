import styles from "./FormRow.module.css";

export default function FormRow({children, horizontalPlacement, verticalPlacement, rowHeight}){
    return (
        <div className={`${styles.inputRow} flex flex-row ${horizontalPlacement} ${verticalPlacement} w-full ${rowHeight} my-4 px-1`}>
            {children}
        </div>
    );
}