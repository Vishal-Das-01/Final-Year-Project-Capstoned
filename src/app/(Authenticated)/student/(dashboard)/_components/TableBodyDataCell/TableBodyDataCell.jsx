import styles from "./TableBodyDataCell.module.css";

export default function TableBodyDataCell({text}){
    return (
        <td className={`${styles.tableBodyDataCell} px-4 py-3 text-left text-ellipsis overflow-hidden whitespace-nowrap`}>
            {text}
        </td>
    );
}