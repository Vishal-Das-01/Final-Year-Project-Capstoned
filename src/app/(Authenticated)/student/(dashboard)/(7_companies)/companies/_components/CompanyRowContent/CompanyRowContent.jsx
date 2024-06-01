import styles from "./CompanyRowContent.module.css";

import ModalContent from "@/app/(Authenticated)/admin/(dashboard)/_components/ModalContent/ModalContent";
import ModalContentHeading from "@/app/(Authenticated)/admin/(dashboard)/_components/ModalContentHeading/ModalContentHeading";
import ModalContentText from "@/app/(Authenticated)/admin/(dashboard)/_components/ModalContentText/ModalContentText";

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

                

            </ModalContent>
        
        </div>
    );
}