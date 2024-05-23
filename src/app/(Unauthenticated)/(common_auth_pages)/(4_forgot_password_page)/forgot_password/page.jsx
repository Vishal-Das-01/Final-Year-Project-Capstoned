import FormHeading from "./_components/FormHeading/FormHeading.jsx";
import styles from "../../CommonAuthPages.module.css";
import ForgotPasswordForm from "./_components/ForgotPasswordForm/ForgotPasswordForm.jsx";

export const metadata = {
  title: "Capstoned Forgot Password",
  description: "Capstoned Forgot Password Page | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function ForgotPasswordPage(props){
	return (
		<div className="w-full h-full flex items-center justify-center">

			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-center rounded-lg `}>

				<div className={`${styles.formContainer} flex flex-col items-center justify-center w-full h-full `}>

					<FormHeading />

					<ForgotPasswordForm />
				
				</div>
			
			</div>
		
		</div>
	);
	}