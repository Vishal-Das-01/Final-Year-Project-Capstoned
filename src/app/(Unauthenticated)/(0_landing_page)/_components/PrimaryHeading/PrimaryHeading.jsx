import styles from "./PrimaryHeading.module.css";

export default function PrimaryHeading({children}){
	return (
		<div>
			<h1 className={`${styles.primaryHeading} font-exo2 font-semibold text-neutral-600`}>
				{children.toUpperCase()}
			</h1>
		</div>
	);
}