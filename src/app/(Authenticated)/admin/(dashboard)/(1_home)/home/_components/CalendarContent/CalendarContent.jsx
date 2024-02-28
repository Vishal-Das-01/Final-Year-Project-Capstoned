import styles from "./CalendarContent.module.css";

export default function CalendarContent({date}){
	return (
		<div className={`h-full w-full`}>

			<div className={`mx-2 my-4`}>

				<div className={`${styles.contentHeadingWrapper} flex flex-row items-center `}>

					<h1 className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}>
						Calendar
					</h1>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>

				<div className={`${styles.calendarInfoWrapper} flex flex-col my-2`}>

				</div>

			</div>

		</div>
	);
}