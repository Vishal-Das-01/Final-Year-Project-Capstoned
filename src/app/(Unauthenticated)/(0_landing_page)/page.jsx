import styles from "./LandingPage.module.css";
import Image from "next/image";
import PrimaryHeading from "./_components/PrimaryHeading/PrimaryHeading.jsx";
import SecondaryHeading from "./_components/SecondaryHeading/SecondaryHeading.jsx";
import EnterCapstonedBtn from "./_components/EnterCapstonedBtn/EnterCapstonedBtn.jsx";  


export default function LandingPage(props){
	return (
		<div className="h-full w-full flex flex-col">
			<div className="h-full w-full flex items-center">
				<div className={`${styles.left} flex flex-col h-full items-center justify-center`}>
					<PrimaryHeading>
						Capstoned
					</PrimaryHeading>

					<SecondaryHeading>
						The Only Tool You Need To Manage Your Projects
					</SecondaryHeading>

					<EnterCapstonedBtn href="/login">
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