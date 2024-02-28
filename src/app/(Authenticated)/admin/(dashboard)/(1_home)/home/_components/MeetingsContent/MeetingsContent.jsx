import styles from "./MeetingsContent.module.css";
import ListTile from "../_components/ListTile/ListTile";

export default function MeetingsContent({location, meetingDate}){
	return (
		<div className={`h-full w-full`}>

			<div className={`mx-2 my-4`}>

				<div className={`${styles.contentHeadingWrapper} flex flex-row items-center `}>

					<h1 className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}>
						Meetings
					</h1>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>

				<div className={`${styles.meetingInfoWrapper} flex flex-col my-2`}>

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

				</div>

			</div>

		</div>
	);
}