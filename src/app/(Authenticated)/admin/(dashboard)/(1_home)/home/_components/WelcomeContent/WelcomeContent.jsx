import styles from "./WelcomeContent.module.css";

export default function WelcomeContent({name, message}){
	return (
		<div className={`mx-2`}>

			<h1 className={`font-montserrat font-semibold text-2xl py-2`}>
				Welcome, {name}
			</h1>
					
			<p className={`font-montserrat font-semibold text-xl text-neutral-600`}>
				{message}
			</p>
		
		</div>
	);
}