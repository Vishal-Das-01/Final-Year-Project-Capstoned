export default function Footer(props){
	return (
		<footer className="h-16 w-full flex items-center space-between hidden xl:flex">
		
			<div className="left flex flex-1 h-full w-full items-center justify-center  ">
				
			</div>

			<div className="center flex flex-1 h-full w-full items-center justify-center ">
				<p className="text-base text-black font-semibold font-montserrat">
					&#169;{(new Date().getFullYear())} Capstoned - All rights reserved.
				</p>
			</div>
			
			<div className="right flex flex-1 h-full w-full items-center justify-center">
				
			</div>
		
		</footer>
	);
}