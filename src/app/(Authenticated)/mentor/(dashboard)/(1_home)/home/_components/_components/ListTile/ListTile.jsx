import styles from "./ListTile.module.css";

export default function ListTile({sNo, text, date}){
    return (
        <div className={`${styles.listTileWrapper} flex flex-col w-full `}>
            
            <div className={`${styles.listTileContentWrapper} flex flex-row justify-between w-full`}>
                
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

                <div className={`${styles.date} `}>

                    <p className={`${styles.common} font-montserrat text-neutral-500`}>
                        {date}
                    </p>

                </div>

            </div>

            <hr className={`${styles.divider}`}/>
        </div>
    );
}