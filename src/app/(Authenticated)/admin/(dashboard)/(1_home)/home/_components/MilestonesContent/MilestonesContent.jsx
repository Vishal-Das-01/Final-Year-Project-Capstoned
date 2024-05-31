import styles from "./MilestonesContent.module.css";
import UpcomingMilestone from "./_components/UpcomingMilestone/UpcomingMilestone";

export default function MilestonesContent({milestone}){
	return (
		<div className={`h-full w-full `}>

			<div className={`mx-2 my-4`}>

				<div className={`${styles.contentHeadingWrapper} flex flex-row items-center `}>

					<p className={`${styles.contentHeading} font-montserrat font-semibold text-black py-2`}>
						Next Milestone Deadline
					</p>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>

				<div className={`${styles.milestonesInfoWrapper} flex flex-col my-2  items-center justify-center `}>
					
					<UpcomingMilestone milestone={milestone}/>

				</div>

			</div>
			
		</div>
	);
}

// Removed content
{/* <div className={`${styles.milestonesInfoWrapper} flex flex-col my-2  `}>
	<ListTile 
		sNo={`1`} 
		text={`Milestone 1`} 
		date={`Jan 12, 2024`}
	/>

	<ListTile 
		sNo={`2`} 
		text={`Milestone 2`} 
		date={`Jan 18, 2024`}
	/>

	<ListTile 
		sNo={`3`} 
		text={`Milestone 3`} 
		date={`Jan 28, 2024`}
	/>

	<ListTile 
		sNo={`4`} 
		text={`Milestone 4`} 
		date={`Feb 3, 2024`}
	/>

</div> */}


