import styles from "./AnnouncementsRowContent.module.css";
import ModalContent from "../../../../_components/ModalContent/ModalContent";
import ModalContentHeading from "../../../../_components/ModalContentHeading/ModalContentHeading";
import ModalContentText from "../../../../_components/ModalContentText/ModalContentText";
import ModalDataActionButton from "../../../../_components/ModalDataActionButton/ModalDataActionButton";
import UpdateAnnouncementForm from "../UpdateAnnouncementForm/UpdateAnnouncementForm";

export default function AnnouncementsRowContent({dataID, data, setModalContent, setOpenModal, callDeleteAnnouncementToast, setDataChanged}){
    return (
        <div className={`w-full h-full`}>

            <ModalContent>
                
                <ModalContentHeading>
                    Announcement Sender:
                </ModalContentHeading>

                <ModalContentText>
                    {String(`${data.sender.firstName.includes("Admin") ? data.sender.firstName : data.sender.firstName + " " + data.sender.lastName}`)}
                </ModalContentText>

            </ModalContent>
            
            <ModalContent>
                
                <ModalContentHeading>
                    Announcement Description:
                </ModalContentHeading>

                <ModalContentText>
                    {data.description}
                </ModalContentText>

            </ModalContent>

            <ModalContent>
                
                <ModalContentHeading>
                    Announcement Priority:
                </ModalContentHeading>

                <ModalContentText>
                    {data.priority}
                </ModalContentText>

            </ModalContent>

            <ModalContent>
                
                <ModalContentHeading>
                    Announcement Type:
                </ModalContentHeading>

                <ModalContentText>
                    {data.type}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Announcement Activated:
                </ModalContentHeading>

                <ModalContentText>
                    {data.activated ? "Yes" : "No"}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <div className={`flex flex-row items-end justify-end h-full `} style={{height: "150px"}}>
                                        
                    {/* <ModalDataActionButton 
                        buttonText={"Post"} 
                        buttonClickAction={null}
                        dataID={dataID}
                        isUpdate={false}
                        isDelete={false}
                    /> */}

                    <ModalDataActionButton 
                        buttonText={"Update"} 
                        buttonClickAction={() => setModalContent(<UpdateAnnouncementForm setOpenModal={setOpenModal} data={data} dataID={dataID} setDataChanged={setDataChanged}/>)}
                        dataID={dataID}
                        isUpdate={true}
                        isDelete={false}
                    />

                    <ModalDataActionButton 
                        buttonText={"Delete"} 
                        buttonClickAction={() => callDeleteAnnouncementToast(dataID)}
                        dataID={dataID}
                        isUpdate={false}
                        isDelete={true}
                    />

                    
                </div>

            </ModalContent>

        </div>
    );
}