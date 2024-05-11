import styles from "./ContactPage.module.css";
import ContactInput from "./_components/ContactInput/ContactInput.jsx";
import ContactMessageTextArea from "./_components/ContactMessageTextArea/ContactMessageTextArea.jsx";
import Image from "next/image";

export const metadata = {
  title: "Contact Capstoned",
  description: "Capstoned Contact Page | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function ContactPage(props){
	return (
		<div className="w-full h-full flex items-center justify-center ">
			
			<div className={`${styles.left} flex flex-row h-full `}>
				
			</div>

			<div className={`${styles.center} flex flex-row items-center justify-center `}>

				<div className={`${styles.mainContainer} flex flex-col items-center justify-center h-full`}>	

					<div className={`${styles.mainHeadingContainer}`}>
						
						<h1 className={`${styles.mainHeading} font-montserrat text-blue-300`}>
							Get In Touch
						</h1>
					
					</div>

					<div className={`${styles.contactFormContainer} flex flex-col items-center `}>
						
						<form className={`${styles.contactForm}`}>
							
							<ContactInput 
								inputType="text"
								inputPlaceholder="Name"
								/>

							<ContactInput 
								inputType="email"
								inputPlaceholder="Email"
								/>

							<ContactMessageTextArea />

						</form>
					
					</div>
				
				</div>
			
			</div>

			<div className={`${styles.right} h-full `} />
		
		</div>
	);
}