import styles from "./LoginPage.module.css";

export const metadata = {
  title: "Capstoned Login",
  description: "Capstoned Login Page | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function LoginPage(props){
	return (
		<div className="w-full h-full flex items-center justify-center border-2 border-black">
			<div className={`${styles.secondaryContainer} flex flex-col items-center justify-center rounded-lg `}>
				<div className={`${styles.formContainer} flex flex-col items-center justify-center w-full h-full border-2 border-blue-500`}>
					<form className="flex flex-col">
						<input type="email" />
						<input type="password" />
					</form>
				</div>
			</div>
		</div>
	);
}