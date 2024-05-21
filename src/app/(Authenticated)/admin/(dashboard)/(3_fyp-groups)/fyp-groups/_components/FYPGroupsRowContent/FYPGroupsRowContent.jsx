import styles from "./FYPGroupsRowContent.module.css";
import ModalContent from "../../../../_components/ModalContent/ModalContent";
import ModalContentHeading from "../../../../_components/ModalContentHeading/ModalContentHeading";
import ModalContentText from "../../../../_components/ModalContentText/ModalContentText";

// Import below for getting proper date
import { extractDate } from "@/utils/helpers/func"; 

export default function FYPGroupsRowContent({dataID, data}){

    return (
        <div className={`w-full h-full`}>
            
            <ModalContent>
                
                <ModalContentHeading>
                    Group Lead:
                </ModalContentHeading>

                <ModalContentText>
                    {data.lead}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    FYP Group Year:
                </ModalContentHeading>

                <ModalContentText>
                    {data.year}
                </ModalContentText>

            </ModalContent>

        </div>
    );
}