"use client";

import styles from "./ProgressContent.module.css";
import ListTile from "../_components/ListTile/ListTile";
import ProgressChart from "./_components/ProgressChart/ProgressChart";

export default function ProgressContent(props){
	const currentDate = new Date();
    const startOfYear = new Date(currentDate.getFullYear(), 0, 1);
    const diff = currentDate - startOfYear;
    const oneDay = 1000 * 60 * 60 * 24;
    const daysPassed = Math.floor(diff / oneDay);

	return (
		<div className={`h-full w-full`}>

			<div className={`mx-2 my-4`}>

				<div className={`${styles.contentHeadingWrapper} flex flex-row items-center `}>

					<h1 className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}>
						Capstone Progress
					</h1>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>

				<div className={`${styles.progressInfoWrapper} flex flex-col my-2 items-center justify-center`}>
					
					<ProgressChart 
						daysPassed={daysPassed} 
						totalDays={365}
					/>

				</div>

			</div>

		</div>
	);
}

// Removed Content
{/* <div className={`${styles.progressInfoWrapper} flex flex-col my-2`}>

<ListTile 
	sNo={`1`} 
	text={`Tabba - MCL 4`} 
	date={`Jan 12, 2024`}
/>

<ListTile 
	sNo={`2`} 
	text={`Faculty Lounge`} 
	date={`Jan 18, 2024`}
/>

<ListTile 
	sNo={`3`} 
	text={`Adamjee Reception`} 
	date={`Jan 28, 2024`}
/>

<ListTile 
	sNo={`4`} 
	text={`Aman Tower`} 
	date={`Feb 3, 2024`}
/>

</div> */}