import styles from "./CompanyRowContent.module.css";
import ModalContent from "../../../../_components/ModalContent/ModalContent";
import ModalContentHeading from "../../../../_components/ModalContentHeading/ModalContentHeading";
import ModalContentText from "../../../../_components/ModalContentText/ModalContentText";
import ModalDataActionButton from "../../../../_components/ModalDataActionButton/ModalDataActionButton";

export default function CompanyRowContent({dataID, data, setModalContent, setOpenModal, callDeleteCompanyToast}){

    return (
        <div className={`w-full h-full`}>
            
            <ModalContent>
                
                <ModalContentHeading>
                    Company Name:
                </ModalContentHeading>

                <ModalContentText>
                    {data.name}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Company Contact Number:
                </ModalContentHeading>

                <ModalContentText>
                    {String(`${"Company Number"}`)}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Company Email:
                </ModalContentHeading>

                <ModalContentText>
                    {`${"Company Email"}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Web URL:
                </ModalContentHeading>

                <ModalContentText>
                    {`${"Web URL"}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    City:
                </ModalContentHeading>

                <ModalContentText>
                    {`${"City"}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <div className={`flex flex-row items-end justify-end h-full `} style={{height: "150px"}}>

                    <ModalDataActionButton 
                        buttonText={"Update"} 
                        buttonClickAction={() => setModalContent(<div>Update Company</div>)}
                        dataID={dataID}
                        isUpdate={true}
                    />

                    <ModalDataActionButton 
                        buttonText={"Delete"} 
                        buttonClickAction={() => callDeleteCompanyToast(dataID)}
                        dataID={dataID}
                        isUpdate={false}
                        isDelete={true}
                    />

                </div>

            </ModalContent>
        
        </div>
    );
}