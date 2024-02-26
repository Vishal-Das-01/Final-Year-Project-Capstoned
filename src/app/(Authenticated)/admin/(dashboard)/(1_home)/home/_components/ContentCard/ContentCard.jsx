import styles from "./ContentCard.module.css";

export default function ContentCard({children}){
	return (
		<div className={`${styles.contentCardContainer} flex flex-col items-start rounded-lg border-2 border-black`}>
			{children}
		</div>
	);
}