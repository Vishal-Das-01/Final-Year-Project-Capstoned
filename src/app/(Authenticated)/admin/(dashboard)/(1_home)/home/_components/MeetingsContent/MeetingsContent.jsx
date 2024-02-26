import styles from "./MeetingsContent.module.css";

export default function MeetingsContent({location, meetingDate}){
	return (
		<div className={`mx-2 w-full`}>

			<h1 className={`font-montserrat font-semibold text-2xl py-2`}>
				Scheduled Meetings
			</h1>

			<div className={`${styles.meetingInfoWrapper} flex flex-row justify-between `}>

				<p className={`font-montserrat font-semibold text-xl text-neutral-600`}>
					{location}
				</p>
				
				<p className={`font-montserrat font-semibold text-xl text-neutral-600 `}>
					{meetingDate}
				</p>

			</div>

		</div>
	);
}