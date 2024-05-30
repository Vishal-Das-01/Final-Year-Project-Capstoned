import styles from "./ProjectsRowContent.module.css";
import ModalContent from "../../../../_components/ModalContent/ModalContent";
import ModalContentHeading from "../../../../_components/ModalContentHeading/ModalContentHeading";
import ModalContentText from "../../../../_components/ModalContentText/ModalContentText";
import ModalDataActionButton from "../../../../_components/ModalDataActionButton/ModalDataActionButton";

export default function ProjectsRowContent({dataID, data, markProjectFinished, setModalContent}){
    return (
        <div className={`w-full h-full`}>

            <ModalContent>
                
                <ModalContentHeading>
                    Group Lead:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.group.lead.firstName} ${data.group.lead.lastName}`}
                </ModalContentText>

            </ModalContent>
            
            <ModalContent>
                
                <ModalContentHeading>
                    Project Title:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.proposal.title}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>
                
                <ModalContentHeading>
                    Project Description:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.proposal.description}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>
                
                <ModalContentHeading>
                    Project Finished:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.finished ? "Yes" : "No"}`}
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
                    Project Status:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.status}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Project Progress:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.progress}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Project Year:
                </ModalContentHeading>

                <ModalContentText>
                    {data.year}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <div className={`flex flex-row items-end justify-end h-full `}>
{/*                     
                    <ModalDataActionButton 
                        buttonText={"Update"} 
                        buttonClickAction={() => setModalContent(<div>Hello</div>)}
                        dataID={dataID}
                        isUpdate={true}
                    /> */}

                    <ModalDataActionButton 
                        buttonText={"Mark Finished"} 
                        buttonClickAction={() => {markProjectFinished(dataID)} }
                        dataID={dataID}
                        isUpdate={false}
                        isDelete={false}
                    />

                    
                </div>

            </ModalContent>

        </div>
    );
}