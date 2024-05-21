import styles from "./AccountsRowContent.module.css";
import ModalContent from "../../../../_components/ModalContent/ModalContent";
import ModalContentHeading from "../../../../_components/ModalContentHeading/ModalContentHeading";
import ModalContentText from "../../../../_components/ModalContentText/ModalContentText";

// Import below for getting proper date
import { extractDate } from "@/utils/helpers/func"; 

export default function AccountsRowContent({dataID, data}){

    return (
        <div className={`w-full h-full`}>
            
            <ModalContent>
                
                <ModalContentHeading>
                    Milestone Number:
                </ModalContentHeading>

                <ModalContentText>
                    {data.assignmentNumber}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Milestone Deadline:
                </ModalContentHeading>

                <ModalContentText>
                    {String(extractDate(data.deadline))}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Milestone Description:
                </ModalContentHeading>

                <ModalContentText>
                    {data.description}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Milestone Year:
                </ModalContentHeading>

                <ModalContentText>
                    {data.year}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Milestone Percentage:
                </ModalContentHeading>

                <ModalContentText>
                    {data.percentage}
                </ModalContentText>

            </ModalContent>

            
        
        </div>
    );
}