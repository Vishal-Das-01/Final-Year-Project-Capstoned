import Link from "next/link";

export default function NavbarMenuLink({children, href}){
	return (
		<Link href={href}>
			<div className="flex w-20 items-center justify-center ">
				<p className="text-black text-lg font-montserrat font-semibold hover:text-neutral-500">
					{children}
				</p>
			</div>
		</Link>
	);
}