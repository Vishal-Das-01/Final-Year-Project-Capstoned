import styles from "./MilestonesContent.module.css";

export default function MilestonesContent({deadlineDate, milestone}){
	return (
		<div className={`mx-2 w-full h-full rounded-3xl`}>

			<div className={`mx-2 my-5`}>

				<p className={`${styles.contentHeading} text-center font-montserrat font-semibold text-black py-2`}>
					Upcoming Deadlines
				</p>

				<div className={`${styles.milestonesInfoWrapper} flex flex-row justify-between  `}>
					
					<p className={`font-montserrat font-semibold text-xl text-neutral-600 `}>
						{milestone}
					</p>

					<p className={`font-montserrat font-semibold text-xl text-neutral-600`}>
						{deadlineDate}
					</p>

				</div>

			</div>
			
		</div>
	);
}