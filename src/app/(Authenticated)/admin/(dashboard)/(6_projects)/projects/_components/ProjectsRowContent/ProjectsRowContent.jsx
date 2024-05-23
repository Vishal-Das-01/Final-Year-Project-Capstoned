import styles from "./ProjectsRowContent.module.css";
import ModalContent from "../../../../_components/ModalContent/ModalContent";
import ModalContentHeading from "../../../../_components/ModalContentHeading/ModalContentHeading";
import ModalContentText from "../../../../_components/ModalContentText/ModalContentText";

// Import below for getting proper date
import { extractDate } from "@/utils/helpers/func"; 

export default function ProjectsRowContent({dataID, data}){
    
    return (
        <div className={`w-full h-full`}>

            <ModalContent>
                
                <ModalContentHeading>
                    Project:
                </ModalContentHeading>

                <ModalContentText>
                    {`asas`}
                </ModalContentText>

            </ModalContent>
            
            <ModalContent>
                
                <ModalContentHeading>
                    Group Lead:
                </ModalContentHeading>

                <ModalContentText>
                    {`aasas`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    FYP Group Members:
                </ModalContentHeading>

                <ModalContentText>
                    {   
                        "Group has no members"
                    }
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    FYP Mentors:
                </ModalContentHeading>

                <ModalContentText>
                    {  
                        "Group has no mentors"
                    }
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    FYP Supervisor:
                </ModalContentHeading>

                <ModalContentText>
                    {   
                        "Group has no supervisor."
                    }
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    FYP Group Year:
                </ModalContentHeading>

                <ModalContentText>
                    {`data.year`}
                </ModalContentText>

            </ModalContent>

        </div>
    );
}