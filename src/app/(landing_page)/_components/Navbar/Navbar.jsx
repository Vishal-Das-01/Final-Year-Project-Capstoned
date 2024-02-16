import Brand from "./_components/Brand/Brand.jsx";

export default function Navbar(props){
	return (
		<nav className="h-20 w-full flex items-center bg-pink-950">
			<div className="left flex flex-1 h-full w-full items-center px-4 border-2 border-black">
				<Brand href="/">
					Capstoned
				</Brand>
			</div>
			<div className="right flex flex-2 h-full w-full justify-end ">
				<div className="menuItemContainer h-full flex items-center border-2 border-green-500">
					Menu
				</div>
			</div>
		</nav>
	);
}