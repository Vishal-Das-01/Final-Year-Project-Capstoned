import Link from "next/link";

export default function Brand({children, href}){
	return (
		<Link href={href}>
			<p className="font-bold">
				{children}
			</p>
		</Link>
	);
}