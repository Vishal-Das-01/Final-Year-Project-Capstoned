import styles from "./LandingPage.module.css";
import Image from "next/image";
import PrimaryHeading from "./_components/PrimaryHeading/PrimaryHeading.jsx";
import SecondaryHeading from "./_components/SecondaryHeading/SecondaryHeading.jsx";
import EnterCapstonedBtn from "./_components/EnterCapstonedBtn/EnterCapstonedBtn.jsx";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import SpaceshipLottie from "./_components/SpaceshipLottie/SpaceshipLottie.jsx";

export default function LandingPage(props) {
  return (
    <div className="h-full w-full flex flex-col relative">

      <div className="h-full w-full flex items-center">

        <div className={`${styles.left} flex flex-col h-full items-center justify-center`}>

          <div className="flex flex-row h-20 items-center justify-center">

            <PrimaryHeading>Capstoned</PrimaryHeading>
            
			      <div className={`${styles.lottieWrapper} pl-7`}>

              <SpaceshipLottie src={`/spaceship.json`} />
            
            </div>
          
		      </div>

          <SecondaryHeading>
            The Only Tool You Need To Manage Your Projects
          </SecondaryHeading>

          <EnterCapstonedBtn href={FRONTEND_ROUTES.login_page}>
            Enter Capstoned
          </EnterCapstonedBtn>

        </div>

      </div>
	  
    </div>
  );
}

// Deleted code of right component below

//<div className={`${styles.right} flex  items-center justify-center h-full `}>
//	<Image src="/capstone_img.gif" alt="Capstoned Image" height={800} width={500} />
//</div>
