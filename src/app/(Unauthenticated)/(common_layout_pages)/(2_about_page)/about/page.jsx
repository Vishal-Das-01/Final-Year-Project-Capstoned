import styles from "./AboutPage.module.css";
import TextContent from "./_components/TextContent/TextContent.jsx";

export const metadata = {
  title: "About Capstoned",
  description: "Capstoned About Page | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function AboutPage(props){

	return (
		<div className={`${styles.mainWrapper} w-full h-full flex flex-row items-center justify-center`}>

			<div className={`${styles.leftContainer} h-full flex flex-row items-center justify-end `}>
			
				<TextContent />

			</div>

			<div className={`${styles.rightContainer} h-full flex flex-col items-center justify-center `}>
				
				<div className={`${styles.topDesignDivWrapper}`}>

					<div className={`${styles.topDesignDiv} bg-blue-300 rounded-2xl`}/>

				</div>

				<div className={`flex flex-row items-center justify-center `}>

					<div className={`${styles.firstDesignDiv} ${styles.designDiv} bg-neutral-700 rounded-2xl`}/>

					<div className={`${styles.secondDesignDiv} ${styles.designDiv} bg-blue-300 rounded-2xl`}/>

					<div className={`${styles.thirdDesignDiv} ${styles.designDiv} bg-neutral-700 rounded-2xl`}/>

				</div>

				<div className={`${styles.bottomDesignDivWrapper} flex items-center justify-between `}>

					<div className={`${styles.firstBottomDesignDiv} bg-blue-300 rounded-2xl`}/>

					<div className={`${styles.secondBottomDesignDiv} bg-neutral-700 rounded-2xl`}/>

				</div>

			</div>

		</div>
	);
}



/*
<p className={`${styles.text} font-montserrat text-justify text-neutral-700`}>
In the fast-paced world of technology and innovation, managing a final year project can be a daunting task for undergraduate students. Recognizing the need for a streamlined, efficient, and user-friendly platform, Capstoned was born. Capstoned is designed to bridge the gap between complex project management and academic requirements, facilitating a smoother journey from conception to completion.
</p>
*/