import styles from "./SecondaryHeading.module.css";

export default function SecondaryHeading({children}){
	return (
		<div className={`${styles.secondaryHeadingContainer} flex items-center justify-center h-20 my-6`}>
			<h2 className={`${styles.secondaryHeading} text-neutral-500`}>
				{children}
			</h2>
		</div>
	);
}