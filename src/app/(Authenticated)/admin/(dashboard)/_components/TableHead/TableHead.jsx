import styles from "./TableHead.module.css";

export default function TableHead({children}){
    return (
        <thead className="sticky top-0 text-xs text-white bg-blue-500 uppercase text-center ">

            <tr>
                {children}
            </tr>
            
        </thead>
    );
}