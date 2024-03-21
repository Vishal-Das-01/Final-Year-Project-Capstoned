import LoginInput from "./_components/LoginInput/LoginInput.jsx";
import LoginSubmitBtn from "./_components/LoginSubmitBtn/LoginSubmitBtn.jsx";
import ForgetPasswordLink from "./_components/ForgetPasswordLink/ForgetPasswordLink.jsx";
import FormHeading from "./_components/FormHeading/FormHeading.jsx";
import styles from "./LoginPage.module.css";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes.js";

export const metadata = {
  title: "Capstoned Login",
  description: "Capstoned Login Page | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function LoginPage(props){
	return (
		<div className="w-full h-full flex items-center justify-center">

			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-center rounded-lg `}>

				<div className={`${styles.formContainer} flex flex-col items-center justify-center w-full h-full `}>

					<FormHeading />

					<form className="flex flex-col w-full items-center justify-center mt-3">

						<LoginInput 
							label="Email" 
							inputType="email" 
							inputPlaceholder="Email" 
						/>

						<LoginInput 
							label="Password" 
							inputType="password" 
							inputPlaceholder="Password" 
						/>

						<ForgetPasswordLink href={FRONTEND_ROUTES.forget_password_page}/>

						<LoginSubmitBtn btnText="Login"/>

					</form>
					
					<div className={`${styles.errorMsgContainer} w-full flex items-center justify-center h-8`}>

						<p className={`${styles.errorMsg} font-montserrat font-base text-red-600 text-lg`}>
							{``}
						</p>
					
					</div>
				
				</div>
			
			</div>
		
		</div>
	);
}