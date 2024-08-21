import Footer from "@/app/(Unauthenticated)/_components/Footer/Footer.jsx";
import Navbar from "./_components/Navbar/Navbar";
import styles from "./CommonAuthPages.module.css";

export default function Layout({children}) {
  return (
    <div className={`${styles.mainWrapper} h-full w-full flex flex-col`}>
      <Navbar />
      <div className="h-full w-full flex justify-center items-center">
        {/* Main content for large screens */}
        <div className="hidden xl:flex w-full h-full">
          {children}
        </div>

        {/* Small device message */}
        <div className="flex justify-center items-center h-full xl:hidden">
          <div className="text-center">
            <h1 className="text-[48px] font-exo2 font-semibold text-neutral-600">
              Capstoned
            </h1>
            <p className="text-red-500 text-lg mt-4 font-medium">
              We are not available on small devices
            </p>
          </div>
        </div>
      </div>
      {/* Footer hidden for screens 1000px or less */}
      <Footer />
    </div>
  );
}