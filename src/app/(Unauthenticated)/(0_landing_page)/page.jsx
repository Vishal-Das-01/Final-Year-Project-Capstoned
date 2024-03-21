import styles from "./LandingPage.module.css";
import Image from "next/image";
import PrimaryHeading from "./_components/PrimaryHeading/PrimaryHeading.jsx";
import SecondaryHeading from "./_components/SecondaryHeading/SecondaryHeading.jsx";
import EnterCapstonedBtn from "./_components/EnterCapstonedBtn/EnterCapstonedBtn.jsx";  
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import AstronotLottie from "./_components/AstronotLottie/AstronotLottie.jsx";

export default function LandingPage(props){
	return (
		<div className="h-full w-full flex flex-col relative">

			<div className="h-full w-full flex items-center">

				<div className={`${styles.left} flex flex-col h-full items-center justify-center`}>
					
					<PrimaryHeading>
						Capstoned
					</PrimaryHeading>

					<SecondaryHeading>
						The Only Tool You Need To Manage Your Projects
					</SecondaryHeading>

					<EnterCapstonedBtn href={FRONTEND_ROUTES.login_page}>
						Enter Capstoned
					</EnterCapstonedBtn>
				
				</div>
			
			</div>

			<div className={`${styles.lottieWrapper}`}>
				<AstronotLottie src={`/astronot.json`}/>
			</div>
		
		</div>
	);
}

// Deleted code of right component below

//<div className={`${styles.right} flex  items-center justify-center h-full `}>
//	<Image src="/capstone_img.gif" alt="Capstoned Image" height={800} width={500} />
//</div>