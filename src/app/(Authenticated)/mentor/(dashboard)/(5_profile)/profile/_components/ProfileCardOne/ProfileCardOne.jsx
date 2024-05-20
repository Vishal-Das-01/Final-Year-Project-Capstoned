import Image from "next/image";
import React from "react";
import { RiProfileLine } from "react-icons/ri";
import ProfileImageCard from "../ProfileImageCard/ProfileImageCard";

function ProfileCardOne({ firstName, lastName, gender, contact, teacher, email, profileImage }) {
  
  return (
    <div className="relative flex flex-col py-5 h-auto items-center justify-center bg-blue-50 m-5 rounded-xl">
      <div className="absolute top-4 left-4">
        <RiProfileLine className="h-6 w-6"/>
      </div>
      
      <ProfileImageCard profileImage={profileImage}/>

      <div className="flex flex-col w-full justify-start items-center p-5 space-y-1">
        <p className="font-montserrat font-semibold text-lg">{firstName} {lastName}</p>
        <p className="font-montserrat font-normal text-sm text-neutral-500">
          {email}
        </p>
        <p className="font-montserrat font-normal text-sm text-neutral-500">
            Gender: {gender}
        </p>
        <p className="font-montserrat font-normal text-sm text-neutral-500">
            {`Role: ${teacher ? "Teacher" : "Mentor"}`}
        </p>
        <p className="font-montserrat font-normal text-sm text-neutral-500">
            Contact: {contact}
        </p>
      </div>
    </div>
  );
}

export default ProfileCardOne;
