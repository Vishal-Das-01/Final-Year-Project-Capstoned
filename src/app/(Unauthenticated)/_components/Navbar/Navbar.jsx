import Brand from "./_components/Brand/Brand.jsx";
import NavbarMenuLink from "./_components/NavbarMenuLink/NavbarMenuLink.jsx";
import ActionButtonLink from "./_components/ActionButtonLink/ActionButtonLink.jsx";
import {FRONTEND_ROUTES} from "@/utils/frontend_routes.js";

export default function Navbar(props){
	return (
		<nav className="h-24 w-full flex items-center space-between ">

			<div className="left flex flex-1 h-full w-full items-center justify-center  ">

				<Brand href={FRONTEND_ROUTES.landing_page}>
					Capstoned
				</Brand>
			
			</div>
			
			<div className="center flex flex-1 h-full w-full items-center justify-center ">

				<NavbarMenuLink href={FRONTEND_ROUTES.landing_page}>
					Home
				</NavbarMenuLink>

				<NavbarMenuLink href={FRONTEND_ROUTES.about_page}>
					About
				</NavbarMenuLink>

				<NavbarMenuLink href={FRONTEND_ROUTES.contact_page}>
					Contact
				</NavbarMenuLink>
			
			</div>
			
			<div className="right flex flex-1 h-full w-full items-center justify-center">

				<ActionButtonLink href={FRONTEND_ROUTES.login_page} filled={false}>
					Log In
				</ActionButtonLink>
			
			</div>
		
		</nav>
	);
}


// Deleted sign up button code below. 

//<ActionButtonLink href="/" filled={true}>
//	Sign Up
//</ActionButtonLink>