import styles from "./ProposalListTile.module.css";
import { MdOutlineCancel } from "react-icons/md";
import { MdOutlineCheckCircle } from "react-icons/md";

export default function ProposalListTile({sNo, text, selected}){
    return (
        <div className={`${styles.listTileWrapper} flex flex-col w-full `}>
            
            <div className={`${styles.listTileContentWrapper} flex justify-between flex-row w-full`}>
                
                <div className={`${styles.sNo} flex flex-row items-center justify-start `}>

                    <p className={`${styles.common} font-montserrat text-neutral-500`}>
                        {sNo}
                    </p>

                </div>

                <div className={`${styles.text} flex flex-row items-center justify-start `}>

                    <p className={`${styles.common} font-montserrat text-neutral-500`}>
                        {text}
                    </p>

                </div>

                <div className={`${styles.selected} flex flex-row items-center justify-center`}>

                    <p className={`font-montserrat`}>
                        {selected ? <div className={`${styles.status} bg-green-200`}> SELECTED </div> :<div className={`${styles.status} bg-red-200`}> UNSELECTED </div> }
                    </p>

                </div>

            </div>

            <hr className={`${styles.divider}`}/>
        </div>
    );
}