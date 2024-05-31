import styles from "./SearchUsers.module.css";
import UserContent from "./_components/UserContent/UserContent";

export const metadata = {
  title: "Search Users",
  description:
    "Capstoned | Final Year Project (FYP) Management Platform for College & University Students.",
};

export default function SearchUsers() {
  return (
    <div
      className={`${styles.contentCardTitleContainer} p-3 my-9 mx-5 flex flex-col rounded-xl font-montserrat`}
    >
      <div className="flex flex-row items-center justify-start w-auto h-8 py-2 mr-5">
        <h1 className={`${styles.contentHeading} font-semibold text-black`}>
          Search Users
        </h1>
        <div
          className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
        />
      </div>

      <div className={`${styles.container} m-4`}>
        <UserContent />
      </div>
    </div>
  );
}
