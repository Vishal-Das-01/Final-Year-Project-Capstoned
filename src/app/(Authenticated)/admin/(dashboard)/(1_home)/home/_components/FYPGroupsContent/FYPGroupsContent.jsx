import styles from "./FYPGroupsContent.module.css";

export default function FYPGroupsContent({deadlineDate, milestone}){
	return (
		<div className={`mx-2 w-full`}>

			<h1 className={`font-montserrat font-semibold text-2xl py-2`}>
				FYP Groups
			</h1>

			<div className={`${styles.fypGroupsWrapper} flex flex-row justify-between  `}>
				Groups
			</div>
			
		</div>
	);
}