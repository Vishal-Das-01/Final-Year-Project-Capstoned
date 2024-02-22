import Image from "next/image";
import Link from "next/link";
import styles from "./Avatar.module.css";

export default function Avatar({href, src, alt}){
	return (
		<div className={`flex flex-row items-center justify-center `}>
			<Link href={href}>
				<div className={``}>
					<Image 
						src={src} 
						alt={alt}
						height={42}
						width={42}
					/>
				</div>
			</Link>
		</div>
	);
}