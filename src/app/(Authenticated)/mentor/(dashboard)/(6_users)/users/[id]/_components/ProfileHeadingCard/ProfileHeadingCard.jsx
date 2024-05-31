"use client";
import React, { useState } from "react";
import { FaEdit } from "react-icons/fa";
import styles from "./ProfileHeadingCard.module.css";
import ProfileUpdateModal from "./_components/ProfileUpdateModal/ProfileUpdateModal";

function ProfileHeadingCard({ bio, company, industries, roomNum, officeHours, occupation }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="flex flex-row items-center w-full justify-between">
      <div className="flex flex-row items-center">
        <h1
          className={`${styles.contentHeading} font-montserrat font-semibold py-2 text-black`}
        >
          Mentor Profile
        </h1>
        <div
          className={`${styles.contentHeadingLine} ml-2 bg-blue-500 rounded-full`}
        />
      </div>

    </div>
  );
}

export default ProfileHeadingCard;
