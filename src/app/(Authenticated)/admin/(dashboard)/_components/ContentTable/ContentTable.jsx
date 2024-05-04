import styles from "./ContentTable.module.css";

export default function ContentTable({children}){
    return (
        <div className={`${styles.tablePrimaryContainer} bg-white overflow-y-auto relative shadow-md sm:rounded-lg`}>

            <table className="w-full text-sm text-left text-gray-500 table-auto">
                {children}
            </table>
            
        </div>
    );
}