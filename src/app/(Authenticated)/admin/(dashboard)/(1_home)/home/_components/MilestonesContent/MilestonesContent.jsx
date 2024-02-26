import styles from "./MilestonesContent.module.css";

export default function MilestonesContent({deadlineDate, milestone}){
	return (
		<div className={`mx-2 w-full`}>

			<h1 className={`font-montserrat font-semibold text-2xl py-2`}>
				Upcoming Deadline
			</h1>

			<div className={`${styles.milestonesInfoWrapper} flex flex-row justify-between  `}>
				
				<p className={`font-montserrat font-semibold text-xl text-neutral-600 `}>
					{milestone}
				</p>

				<p className={`font-montserrat font-semibold text-xl text-neutral-600`}>
					{deadlineDate}
				</p>

			</div>
		</div>
	);
}