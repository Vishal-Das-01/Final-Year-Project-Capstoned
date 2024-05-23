import styles from "./TableTitleAndButton.module.css";
import TableTitle from "../TableTitle/TableTitle";
import TableActionButton from "../TableActionButton/TableActionButton";
import APILoadingButton from "../APILoadingButton/APILoadingButton";

export default function TableTitleAndButton({tableTitle, includeButton, buttonTitle, buttonClickHandler, buttonApiLoading, apiLoadingButtonWidth}){

    return (
        <div className={`${styles.headingAndButtonContainer} flex flex-row items-center justify-between `}>
					
            <TableTitle>
                {tableTitle}
            </TableTitle>

            {
                buttonApiLoading
                ?
                <APILoadingButton width={apiLoadingButtonWidth}/>
                :
                <>
                    {
                        includeButton && 
                        <TableActionButton onClickAction={buttonClickHandler}>
                            {buttonTitle}
                        </TableActionButton>
                    }
                </>   
            
            }

        </div>
    );
}