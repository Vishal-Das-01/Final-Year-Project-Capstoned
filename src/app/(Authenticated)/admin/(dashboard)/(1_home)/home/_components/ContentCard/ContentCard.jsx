import styles from "./ContentCard.module.css";

export default function ContentCard(props){
	return (
		<div className={`${styles.contentCardContainer} border-2 border-black`}>
			Content Card
		</div>
	);
}