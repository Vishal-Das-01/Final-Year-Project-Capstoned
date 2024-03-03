import LoginInput from "./_components/LoginInput/LoginInput.jsx";
import LoginSubmitBtn from "./_components/LoginSubmitBtn/LoginSubmitBtn.jsx";
import styles from "./LoginPage.module.css";

export const metadata = {
  title: "Capstoned Login",
  description: "Capstoned Login Page | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function LoginPage(props){
	return (
		<div className="w-full h-full flex items-center justify-center">

			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-center rounded-lg `}>

				<div className={`${styles.formContainer} flex flex-col items-center justify-center w-full h-full relative `}>

					<div className={`flex flex-row items-center justify-center `}>
						<p className={`font-montserrat font-semibold text-2xl text-black`}>
							Jump Right In
						</p>

						<div className={`${styles.styledDivLine} absolute rounded-lg`}/>

						<div className={`${styles.secondStyledDivLine} absolute rounded-lg`}/>

					</div>

					<form className="flex flex-col w-full items-center justify-center mt-7 mb-3 ">

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

						<LoginSubmitBtn btnText="Login"/>

					</form>
					
					<div className={`${styles.errorMsgContainer} w-full flex items-center justify-center h-8 `}>

						<p className={`${styles.errorMsg} font-montserrat font-base text-red-600 text-lg`}>
							{``}
						</p>
					
					</div>
				
				</div>
			
			</div>
		
		</div>
	);
}