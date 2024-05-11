import styles from "./TableHeadDataCell.module.css";

export default function TableHeadDataCell({isNumberCell, text}){
    return (
        (isNumberCell) ? 
        <th scope="col" className={`px-4 py-3 text-left`}>
            <span class="sr-only">
                {text}
            </span>
        </th>
        :
        <th scope="col" className={`px-4 py-3 text-left`}>
            {text}
        </th>);
}