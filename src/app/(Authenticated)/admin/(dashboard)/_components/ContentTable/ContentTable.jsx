import styles from "./ContentTable.module.css";
import LoadingIndicator from "../LoadingIndicator/LoadingIndicator";

export default function ContentTable({children, isLoading}){
    return (
        <div className={`${styles.tablePrimaryContainer} bg-white overflow-y-auto relative shadow-md sm:rounded-lg`}>

            {
                isLoading 
                ? 
                <LoadingIndicator />
                :
                <table className="w-full text-sm text-left text-gray-500 table-auto">
                    {children}
                </table>
            }
            
        </div>
    );
}