import styles from "./WelcomeContent.module.css";
import { IoTimerOutline } from "react-icons/io5";
import { FiMessageSquare } from "react-icons/fi";

export default function WelcomeContent({name, notificationCount, messageCount}){
	return (
		<div className={`${styles.welcomeContentWrapper} w-full h-full rounded-3xl`}>
			
			<div className={`mx-2 my-4`}>
			
				<h1 className={`${styles.welcomeHeading} font-montserrat font-semibold py-2 text-blue-500`}>
					Welcome, {name}
				</h1>
				
				<div className={`flex flex-col w-full`}>

					<div className={`flex flex-row w-full`}>

						<div className={`${styles.welcomeMessageIconWrapper} flex flex-row items-center justify-center`}>
							<IoTimerOutline color={`#3b82f6`} size={`20px`}/>
						</div>

						<div className={`${styles.welcomeMessageWrapper}`}>

							<p className={`${styles.welcomeMessage} font-montserrat font-semibold my-2 text-neutral-600`}>
								{`You have ${notificationCount} new notifications.`}
							</p>

						</div>
					
					</div>

					<div className={`flex flex-row w-full`}>

						<div className={`${styles.welcomeMessageIconWrapper} flex flex-row items-center justify-center`}>
							<FiMessageSquare color={`#3b82f6`} size={`20px`}/>
						</div>

						<div className={`${styles.welcomeMessageWrapper}`}>

							<p className={`${styles.welcomeMessage} font-montserrat font-semibold my-2 text-neutral-600`}>
								{`You have ${messageCount} unread messages.`}
							</p>

						</div>
					
					</div>


				</div>
			
			</div>

		</div>
	);
}