import Footer from "./_components/Footer/Footer.jsx";
import Navbar from "./_components/Navbar/Navbar.jsx";

export default function LandingPageLayout({children}){
	return (
		<div>
			<Navbar />
			{children}
			<Footer />
		</div>
	);
}