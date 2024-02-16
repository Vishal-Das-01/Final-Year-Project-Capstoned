import Footer from "./_components/Footer/Footer.jsx";
import Navbar from "./_components/Navbar/Navbar.jsx";

export const metadata = {
  title: "Capstoned",
  description: "Capstoned | FYP Management Portal for College & University Students.",
};

export default function LandingPageLayout({children}){
	return (
		<div className="h-full w-full flex flex-col bg-white">
			<Navbar />
			<div className="h-full w-full">
				{children}
			</div>
			<Footer />
		</div>
	);
}