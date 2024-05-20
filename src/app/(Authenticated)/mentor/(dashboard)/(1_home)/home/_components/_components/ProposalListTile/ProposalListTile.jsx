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
                        {text.length > 18 ? `${text.slice(0, 18)}...` : text}
                    </p>

                </div>

                <div className={`${styles.selected} flex flex-row items-center justify-center`}>

                    <div className="font-montserrat">
                        <div className={`${selected? "bg-green-500" : "bg-red-500"} rounded-full w-4 h-4`}/>
                    </div>

                </div>

            </div>

            <hr className={`${styles.divider}`}/>
        </div>
    );
}