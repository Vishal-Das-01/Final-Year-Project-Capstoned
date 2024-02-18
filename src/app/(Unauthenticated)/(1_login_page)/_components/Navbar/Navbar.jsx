import Brand from "@/app/(Unauthenticated)/_components/Navbar/_components/Brand/Brand.jsx";
import NavbarMenuLink from "@/app/(Unauthenticated)/_components/Navbar/_components/NavbarMenuLink/NavbarMenuLink.jsx";

export default function Navbar(props){
	return (
		<nav className="h-24 w-full flex items-center space-between ">
			<div className="left flex flex-1 h-full w-full items-center justify-center  ">
				<Brand href="/">
					Capstoned
				</Brand>
			</div>
			<div className="center flex flex-1 h-full w-full items-center justify-center ">
				
			</div>
			<div className="right flex flex-1 h-full w-full items-center justify-center">
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
		</nav>
	);
}


// Deleted sign up button code below. 

//<ActionButtonLink href="/" filled={true}>
//	Sign Up
//</ActionButtonLink>