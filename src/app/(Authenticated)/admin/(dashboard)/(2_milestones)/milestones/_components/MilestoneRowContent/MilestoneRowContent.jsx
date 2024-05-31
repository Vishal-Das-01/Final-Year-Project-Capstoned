import styles from "./MilestoneRowContent.module.css";
import ModalContent from "../../../../_components/ModalContent/ModalContent";
import ModalContentHeading from "../../../../_components/ModalContentHeading/ModalContentHeading";
import ModalContentText from "../../../../_components/ModalContentText/ModalContentText";
import ModalDataActionButton from "../../../../_components/ModalDataActionButton/ModalDataActionButton";
import UpdateMilestoneForm from "../UpdateMilestoneForm/UpdateMilestoneForm";

// Import below for getting proper date
import { extractDate } from "@/utils/helpers/func"; 

export default function MilestoneRowContent({dataID, data, setModalContent, setOpenModal, setDataChanged, callAssignMilestoneToast}){

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

            <ModalContent>

                <div className={`flex flex-row items-end justify-end h-full `} style={{height: "150px"}}>

                    <ModalDataActionButton 
                        buttonText={"Update"} 
                        buttonClickAction={() => setModalContent(<UpdateMilestoneForm setOpenModal={setOpenModal} data={data} setDataChanged={setDataChanged}/>)}
                        dataID={dataID}
                        isUpdate={true}
                        isDelete={false}
                    />

                    <ModalDataActionButton 
                        buttonText={"Assign Milestone"} 
                        buttonClickAction={() => callAssignMilestoneToast(dataID)}
                        dataID={dataID}
                        isUpdate={false}
                        isDelete={false}
                    />

                </div>

            </ModalContent>
        
        </div>
    );
}