import Link from "next/link";
import Image from "next/image";
import CapstonedLogo from "@/components/CapstonedLogo/CapstonedLogo.jsx";
import styles from "./Brand.module.css";

export default function Brand({children, href}){
	return (
		<div className={`flex flex-row items-center relative justify-center`}>
			
			<CapstonedLogo />

			<Link href={href}>
				
				<p className="font-bold text-xl font-exo2 text-black hover:text-neutral-500">
					{children}
				</p>
			
			</Link>
		
		</div>
	);
}