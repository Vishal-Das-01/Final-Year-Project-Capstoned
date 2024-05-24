import styles from "./FYPGroupsRowContent.module.css";
import ModalContent from "../../../../_components/ModalContent/ModalContent";
import ModalContentHeading from "../../../../_components/ModalContentHeading/ModalContentHeading";
import ModalContentText from "../../../../_components/ModalContentText/ModalContentText";
import ModalDataActionButton from "../../../../_components/ModalDataActionButton/ModalDataActionButton";

// Import below for getting proper date
import { extractDate } from "@/utils/helpers/func"; 

export default function FYPGroupsRowContent({dataID, data}){
    
    return (
        <div className={`w-full h-full`}>

            <ModalContent>
                
                <ModalContentHeading>
                    Project:
                </ModalContentHeading>

                <ModalContentText>
                    {`${(data.project !== null) ? data.project.proposal.title : "Not Available"}`}
                </ModalContentText>

            </ModalContent>
            
            <ModalContent>
                
                <ModalContentHeading>
                    Group Lead:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.lead.firstName} ${data.lead.lastName}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    FYP Group Members:
                </ModalContentHeading>

                <ModalContentText>
                    {   (data.members.length > 0) 
                        ? 
                        (data.members.map((member) => {
                            return `${member.firstName} ${member.lastName}, `
                        })) 
                        : 
                        "Group has no members"
                    }
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    FYP Mentors:
                </ModalContentHeading>

                <ModalContentText>
                    {   (data.mentors.length > 0) 
                        ? 
                        (data.members.map((mentor) => {
                            return `${mentor.firstName} ${mentor.lastName}, `
                        })) 
                        : 
                        "Group has no mentors"
                    }
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    FYP Supervisor:
                </ModalContentHeading>

                <ModalContentText>
                    {   (data.supervisor !== null) 
                        ? 
                        `${data.supervisor.firstName} ${data.supervisor.lastName}`
                        :
                        "Group has no supervisor."
                    }
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

            <ModalContent>

                <div className={`flex flex-row items-end justify-end `} style={{height: "70px"}}>

                    <ModalDataActionButton 
                        buttonText={"Update"} 
                        buttonClickAction={null}
                        dataID={dataID}
                        isUpdate={true}
                    />

                </div>

            </ModalContent>

        </div>
    );
}