import Brand from "./_components/Brand/Brand.jsx";
import NavbarMenuLink from "./_components/NavbarMenuLink/NavbarMenuLink.jsx";

export default function Navbar(props){
	return (
		<nav className="h-24 w-full flex items-center space-between">
			<div className="left flex flex-1 h-full w-full items-center justify-center  ">
				<Brand href="/">
					Capstoned
				</Brand>
			</div>
			<div className="center flex flex-1 h-full w-full items-center justify-center ">
				<NavbarMenuLink href="/">
					Home
				</NavbarMenuLink>
				<NavbarMenuLink href="/about">
					About
				</NavbarMenuLink>
				<NavbarMenuLink href="/contact">
					Contact
				</NavbarMenuLink>
			</div>
			<div className="right flex flex-1 h-full w-full items-center justify-center border-2 border-black">
				Menu
			</div>
		</nav>
	);
}