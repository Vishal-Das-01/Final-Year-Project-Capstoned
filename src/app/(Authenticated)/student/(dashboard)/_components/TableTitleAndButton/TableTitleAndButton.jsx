import styles from "./TableTitleAndButton.module.css";
import TableTitle from "../TableTitle/TableTitle";
import TableActionButton from "../TableActionButton/TableActionButton";

export default function TableTitleAndButton({tableTitle, includeButton, buttonTitle, buttonClickHandler}){
    return (
        <div className={`${styles.headingAndButtonContainer} flex flex-row items-center justify-between `}>
					
            <TableTitle>
                {tableTitle}
            </TableTitle>

            {
                
                includeButton && 
                <TableActionButton onClickAction={buttonClickHandler}>
                    {buttonTitle}
                </TableActionButton>
            
            }

        </div>
    );
}