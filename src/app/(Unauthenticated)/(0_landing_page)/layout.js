import Footer from "@/app/(Unauthenticated)/_components/Footer/Footer.jsx";
import Navbar from "@/app/(Unauthenticated)/_components/Navbar/Navbar.jsx";
import styles from "./LandingPage.module.css";

export const metadata = {
  title: "Capstoned",
  description: "Capstoned | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function LandingPageLayout({ children }) {
  return (
    <div className={`${styles.landingPage} h-full w-full flex flex-col`}>
      <Navbar />
      <div className="h-full w-full flex justify-center items-center">
        {/* Main content for large screens */}
        <div className="hidden xl:flex">
          {children}
        </div>

        {/* Small device message */}
        <div className="flex justify-center items-center h-full xl:hidden">
          <div className="text-center">
            <h1 className="text-[48px] font-exo2 font-semibold text-neutral-600">
              {metadata.title.toUpperCase()}
            </h1>
            <p className="text-red-500 text-lg mt-4 font-medium">
              We are not available on small devices
            </p>
          </div>
        </div>
      </div>
      <Footer />
    </div>
  );
}
