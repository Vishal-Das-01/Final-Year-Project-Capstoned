import React from "react";
import styles from "./MentorProfilePage.module.css";
import ProfileCardOne from "./_components/ProfileCardOne/ProfileCardOne";
import ProfileCardTwo from "./_components/ProfileCardTwo/ProfileCardTwo";
import ProfileHeadingCard from "./_components/ProfileHeadingCard/ProfileHeadingCard";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { cookies } from "next/headers";
import { HttpStatusCode } from "axios";
import { redirect } from "next/navigation";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { callAPI } from "@/utils/helpers/callAPI";

export const metadata = {
  title: "Mentor Profile",
  description:
    "Capstoned Mentor Home | Final Year Project (FYP) Management Platform for College & University Students.",
};

async function Profile() {
  const profile = await getProfile();
  console.log(profile);

  return (
    <div
      className={`${styles.contentWrapper} w-full h-full py-6 px-5 flex flex-col justify-evenly items-start font-montserrat`}
    >
      <div
        className={`${styles.contentCardTitleContainer} p-3 overflow-auto flex flex-row w-full rounded-xl`}
      >
        <ProfileHeadingCard
          bio={profile.bio}
          company={profile.company}
          industries={profile.industries}
          roomNum={profile.roomNum}
          officeHours={profile.officeHours}
          occupation={profile.occupation}
        />
      </div>

      <div className="flex flex-row w-full h-5/6 items-center justify-center space-x-10">
        <div
          className={`${styles.contentCardContainer} h-full w-1/3 rounded-xl`}
        >
          <ProfileCardOne
            firstName={profile.firstName}
            lastName={profile.lastName}
            gender={profile.gender}
            contact={profile.contact}
            teacher={profile.isUniversityTeacher}
          />
        </div>
        <div
          className={`${styles.contentCardContainer} h-full w-2/3 rounded-xl`}
        >
          <ProfileCardTwo
            bio={profile.bio}
            company={profile.company}
            industries={profile.industries}
            roomNum={profile.roomNum}
            officeHours={profile.officeHours}
            occupation={profile.occupation}
          />
        </div>
      </div>
    </div>
  );
}

export default Profile;

async function getProfile() {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI("GET", accessToken, BACKEND_ROUTES.getProfile);
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData;
  }
  if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}
