import styles from "./PrimaryHeading.module.css";

export default function PrimaryHeading({children}){
	return (
		<div className={`primaryHeadingContainer w-full flex items-center justify-center h-20`}>
			<h1 className={`${styles.primaryHeading} font-exo2 font-semibold text-black`}>
				{children.toUpperCase()}
			</h1>
		</div>
	);
}