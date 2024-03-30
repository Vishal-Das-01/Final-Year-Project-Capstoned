import styles from "./FYPGroupsContent.module.css";

export default function FYPGroupsContent({deadlineDate, milestone}){
	return (
		<div className={`h-full w-full `}>

			<div className={`mx-2 my-4`}>

				<div className={`${styles.contentHeadingWrapper} flex flex-row items-center `}>

					<p className={`${styles.contentHeading} font-montserrat font-semibold text-black py-2`}>
						FYP Groups
					</p>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>

				<div className={`${styles.fypGroupsWrapper} flex flex-col my-2 `}>
					Groups
				</div>
			
			</div>
			
		</div>
	);
}