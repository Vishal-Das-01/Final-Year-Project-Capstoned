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
  return (
    <div
      className="flex flex-col items-start w-full h-full px-5 py-6 justify-evenly font-montserrat"
    >
      <div
        className={`${styles.contentCardTitleContainer} p-3 overflow-auto flex flex-row w-full rounded-xl`}
      >
        <ProfileHeadingCard
          bio={profile.mentor.bio}
          company={profile.mentor.company}
          industries={profile.mentor.industries}
          roomNum={profile.mentor.roomNum}
          officeHours={profile.mentor.officeHours}
          occupation={profile.mentor.occupation}
        />
      </div>

      <div className="flex flex-row items-center justify-center w-full space-x-10 h-5/6">
        <div
          className={`${styles.contentCardContainer} h-full w-1/3 rounded-xl`}
        >
          <ProfileCardOne
            mentorID={profile.mentor._id}
            firstName={profile.mentor.firstName}
            lastName={profile.mentor.lastName}
            gender={profile.mentor.gender}
            contact={profile.mentor.contact}
            teacher={profile.mentor.isUniversityTeacher}
            email={profile.email}
            profileImage={profile.mentor.profileImage}
          />
        </div>
        <div
          className={`${styles.contentCardContainer} h-full w-2/3 rounded-xl`}
        >
          <ProfileCardTwo
            bio={profile.mentor.bio}
            company={profile.mentor.company}
            industries={profile.mentor.industries}
            roomNum={profile.mentor.roomNum}
            officeHours={profile.mentor.officeHours}
            occupation={profile.mentor.occupation}
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
