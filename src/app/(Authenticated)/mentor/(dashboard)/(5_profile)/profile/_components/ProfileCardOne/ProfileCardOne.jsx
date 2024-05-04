'use client'
import Image from "next/image";
import React from "react";
import { RiProfileLine } from "react-icons/ri";
import { useSelector } from "react-redux";

function ProfileCardOne({ firstName, lastName, gender, contact ,teacher }) {

  const authDetails = useSelector((state) => state.AuthDetails);
  
  return (
    <div className="relative flex flex-col py-5 h-auto items-center justify-center bg-blue-50 m-5 rounded-xl">
      <div className="absolute top-4 left-4">
        <RiProfileLine className="h-6 w-6"/>
      </div>
      
      <div className="relative h-36 w-36 rounded-full overflow-hidden mb-3">
        <Image
          alt={"Image Cannot be loaded"}
          src="https://firebasestorage.googleapis.com/v0/b/capstoned-5463f.appspot.com/o/profile_picture%2F65df4b533c513b8b0d83b69d.jpg?alt=media&token=cab7f3cb-a892-4175-a69d-afb8c1e58ff6"
          fill
        />
      </div>

      <button
        type="submit"
        className="w-1/6 text-center text-xs font-montserrat font-semibold rounded-lg tracking-widest text-white bg-black border-2 border-black hover:bg-white hover:border-2 hover:black hover:text-black hover:font-semibold hover:font-montserrat hover:text-xs"
      >
        {"Edit"}
      </button>

      <div className="flex flex-col w-full justify-start items-center p-5 space-y-1">
        <p className="font-montserrat font-semibold text-lg">{firstName} {lastName}</p>
        <p className="font-montserrat font-normal text-sm text-neutral-500">
          {authDetails.email}
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
