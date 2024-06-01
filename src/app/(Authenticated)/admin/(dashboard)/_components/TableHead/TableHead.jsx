import styles from "./TableHead.module.css";

export default function TableHead({children}){
    return (
        <thead className="sticky top-0 text-xs text-white bg-blue-500 uppercase text-center ">

            <tr className="h-[50px] font-montserrat text-[13px]">
                {children}
            </tr>
            
        </thead>
    );
}