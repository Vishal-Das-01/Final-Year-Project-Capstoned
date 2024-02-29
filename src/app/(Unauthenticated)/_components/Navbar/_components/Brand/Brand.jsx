import Link from "next/link";
import Image from "next/image";

export default function Brand({children, href}){
	return (
		<div className={`flex flex-row items-center justify-center`}>
			<Image src={`/logo2.png`} height={100} width={100} className={``}/>
			<Link href={href}>
				<p className="font-bold text-xl font-exo2 text-black hover:text-neutral-500">
					{children}
				</p>
			</Link>
		</div>
	);
}