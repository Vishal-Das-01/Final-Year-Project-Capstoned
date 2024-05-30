import React from "react";
import styles from "./StudentProfilePage.module.css";
import ProfileCardOne from "./_components/ProfileCardOne/ProfileCardOne";
import ProfileCardTwo from "./_components/ProfileCardTwo/ProfileCardTwo";
import ProfileHeadingCard from "./_components/ProfileHeadingCard/ProfileHeadingCard";

export const metadata = {
  title: "Student Profile",
  description:
    "Capstoned Student Home | Final Year Project (FYP) Management Platform for College & University Students.",
};

function Profile() {
  return (
    <div
      className={`${styles.contentWrapper} w-full h-full pt-6 px-5 flex flex-col justify-evenly items-start font-montserrat`}
    >
      <div
        className={`${styles.contentCardTitleContainer} p-3 flex flex-row w-full rounded-xl`}
      >
        <ProfileHeadingCard />
      </div>

      <div className="flex flex-row items-center justify-center w-full space-x-10 h-5/6">
        <div
          className={`${styles.contentCardContainer} h-full w-1/3 rounded-xl`}
        >
          <ProfileCardOne />
        </div>
        <div
          className={`${styles.contentCardContainer} h-full w-2/3 rounded-xl`}
        >
          <ProfileCardTwo />
        </div>
      </div>
    </div>
  );
}

export default Profile;
