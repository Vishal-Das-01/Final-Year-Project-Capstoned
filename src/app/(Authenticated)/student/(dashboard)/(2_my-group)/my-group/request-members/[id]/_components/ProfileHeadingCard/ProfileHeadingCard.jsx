'use client'
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import styles from "./ProfileHeadingCard.module.css";
import ProfileUpdateModal from "./_components/ProfileUpdateModal/ProfileUpdateModal";

function ProfileHeadingCard() {
    const [openModal, setOpenModal] = useState(false);
    const request = false;
    return (
    <div
      className= "flex flex-row items-center w-full justify-between"
    >
      <div className="flex flex-row items-center">
        <h1
          className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}
        >
          Member Profile
        </h1>
        <div
          className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
        />
      </div>

          <div className="text-center justify-center items-center flex flex-row text-xl">
            {!request? 
            <button className="flex flex-row p-1 items-center justify-center w-full h-full font-montserrat rounded-lg text-sm tracking-widest text-white bg-black  border-black hover:bg-white hover:border-black hover:text-black">
              Request
            </button> : 
            <button disabled className="flex flex-row p-1 items-center justify-center w-full h-full font-montserrat rounded-lg text-xs tracking-widest text-white bg-gray-400 px-2.5 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:click-events-none">
              Requested
            </button>}
          </div>

      {openModal && <ProfileUpdateModal setOpenModal={setOpenModal}/>}
    </div>
  );
}

export default ProfileHeadingCard;
