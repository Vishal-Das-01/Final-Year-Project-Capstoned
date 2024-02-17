import Link from "next/link";

export default function NavbarMenuLink({children, href}){
	return (
		<div className="flex w-20 items-center justify-center ">
			<Link href={href}>
				<p className="text-black text-lg font-montserrat font-semibold hover:text-neutral-500">
					{children}
				</p>
			</Link>
		</div>
	);
}