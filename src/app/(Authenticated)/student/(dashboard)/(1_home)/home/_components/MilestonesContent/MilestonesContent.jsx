import styles from "./MilestonesContent.module.css";
import ListTile from "../_components/ListTile/ListTile";
import NotFound from "../_components/NotFound/NotFound";

export default function MilestonesContent({milestones}){
	return (
		<div className={`h-full w-full `}>

			<div className={`mx-2 my-4`}>

				<div className={`${styles.contentHeadingWrapper} flex flex-row items-center `}>

					<p className={`${styles.contentHeading} font-montserrat font-semibold text-black py-2`}>
						Milestones
					</p>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>

				<div className={`${styles.milestonesInfoWrapper} flex flex-col my-2 `}>
					{(!milestones || milestones.length === 0) && <NotFound />}
					{milestones && milestones.length !== 0 && milestones.map((item, index) => (
						<ListTile key={index} sNo={index + 1} title={item.milestoneID.title} deadline={item.milestoneID.deadline} marked={item.marked} submitted={item.submitted}/>						
					))}
				</div>

			</div>
			
		</div>
	);
}