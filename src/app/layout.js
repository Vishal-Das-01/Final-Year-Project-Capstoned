import { Montserrat, Exo_2 } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ 
	subsets: ["latin"],
	variable: "--montserrat" 
});
const exo2 = Exo_2({
	subsets: ["latin"],
	variable: "--exo2"
});

export const metadata = {
  title: "Capstoned",
  description: "Capstoned | FYP Management Portal for College & University Students.",
};

export default function RootLayout({ children }) {
  return (
	<html lang="en">
	  <body className={`${montserrat.variable} ${exo2.variable}`}>
	  	{children}
	  </body>
	</html>
  );
}
