import { Montserrat } from "next/font/google";
import "./globals.css";

const montserrat = Montserrat({ subsets: ["latin"] });

export const metadata = {
  title: "Finnify",
  description: "Finnify | FYP Management Portal for College & University Students.",
};

export default function RootLayout({ children }) {
  return (
	<html lang="en">
	  <body className={montserrat.className}>
	  	{children}
	  </body>
	</html>
  );
}
