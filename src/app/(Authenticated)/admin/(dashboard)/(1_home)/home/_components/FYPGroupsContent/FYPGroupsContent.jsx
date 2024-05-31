import styles from "./FYPGroupsContent.module.css";

export default function FYPGroupsContent({fypGroupCount}){
	return (
		<div className={`h-full w-full `}>

			<div className={`mx-2 my-4`}>

				<div className={`${styles.contentHeadingWrapper} flex flex-row items-center `}>

					<p className={`${styles.contentHeading} font-montserrat font-semibold text-black py-2`}>
						FYP Groups
					</p>

					<div className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`} /> 

				</div>

				<div className={`${styles.fypGroupsWrapper} flex flex-col my-2 items-center justify-center `}>

					<div className={`${styles.topTextContainer} text-neutral-400 w-full flex justify-center `}>

						<p className={`${styles.topText} font-montserrat`}>
							{`There are`}
						</p>

					</div>

					<div className={`${styles.fypGroupCountContainer} w-full flex items-center justify-center `}>

						<p className={`${styles.fypGroupCount} font-montserrat font-bold text-blue-500`}>
							{fypGroupCount}
						</p>

					</div>

					<div className={`${styles.bottomTextContainer} w-full text-neutral-400 flex-col items-center justify-center`}>

						<p className={`${styles.bottomTextOne} font-montserrat text-center `}>
							{`Groups`}
						</p>

						<p className={`${styles.bottomTextTwo} font-montserrat text-center`}>
							{`this year`}
						</p>

					</div>

				</div>
			
			</div>
			
		</div>
	);
}