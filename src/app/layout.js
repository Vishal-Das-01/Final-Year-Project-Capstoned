import { Montserrat, Exo_2 } from "next/font/google";
import "./globals.css";
import ReduxProvider from "@/provider/redux/ReduxProvider";
import { Toaster } from "react-hot-toast";

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
	description: "Capstoned | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function RootLayout({ children }) {
	return (
		<html lang="en">
			<body className={`${montserrat.variable} ${exo2.variable}`}>
				<ReduxProvider>
					{children}
				</ReduxProvider>
				<Toaster position="bottom-right" />
			</body>
		</html>
	);
}
