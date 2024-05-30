import styles from "./ProposalListTile.module.css";

export default function ProposalListTile({sNo, title, proposer, proposedBy}){
    return (
        <div className={`${styles.listTileWrapper} flex flex-col w-full `}>
            
            <div className={`${styles.listTileContentWrapper} flex justify-between flex-row w-full`}>
                
                <div className="w-1/12">

                    <p className={`${styles.common} font-montserrat text-neutral-500`}>
                        {sNo}
                    </p>

                </div>

                <div className="w-6/12">

                    <p className={`${styles.common} font-montserrat text-neutral-500`}>
                    {title.length > 15 ? title.substring(0, 15) + "..." : title}
                    </p>

                </div>

                <div className="w-5/12">

                    <p className={`${styles.common} text-center`}>
                        {proposer === 'Group'? <div className="bg-blue-200 rounded-full"> Your Group </div> :<div className="bg-yellow-200 rounded-full"> {proposedBy.firstName + " " + proposedBy.lastName} </div> }
                    </p>

                </div>

            </div>

            <hr className={`${styles.divider}`}/>
        </div>
    );
}