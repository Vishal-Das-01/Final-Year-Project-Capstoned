import styles from "./CompanyRowContent.module.css";
import ModalContent from "../../../../_components/ModalContent/ModalContent";
import ModalContentHeading from "../../../../_components/ModalContentHeading/ModalContentHeading";
import ModalContentText from "../../../../_components/ModalContentText/ModalContentText";
import ModalDataActionButton from "../../../../_components/ModalDataActionButton/ModalDataActionButton";
import UpdateCompanyForm from "../UpdateCompanyForm/UpdateCompanyForm";

export default function CompanyRowContent({dataID, data, setModalContent, setOpenModal, callDeleteCompanyToast, setDataChanged}){

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
                    {String(`${data.phone ? data.phone : "N/A"}`)}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Company Email:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.email ? data.email : "N/A"}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Web URL:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.webURL ? data.webURL : "N/A"}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    City:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.city ? data.city : "N/A"}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <ModalContentHeading>
                    Company Verified:
                </ModalContentHeading>

                <ModalContentText>
                    {`${data.verified ? "Yes" : "No"}`}
                </ModalContentText>

            </ModalContent>

            <ModalContent>

                <div className={`flex flex-row items-end justify-end h-full `} style={{height: "115px"}}>

                    <ModalDataActionButton 
                        buttonText={"Update"} 
                        buttonClickAction={() => setModalContent(<UpdateCompanyForm setOpenModal={setOpenModal} data={data} dataID={dataID} setDataChanged={setDataChanged}/>)}
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