import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { PiSealWarningFill } from "react-icons/pi";
import Link from "next/link";

function ListTile({ name, group, progress, onClick }) {
  return (
    <Link href="final-year-groups/123" className="font-montserrat mb-4 mt-1 mx-1 h-1/5 rounded-xl shadow-lg bg-gray-100 hover:bg-gray-300 grid grid-cols-4 items-center justify-between px-5 text-lg">
      <h1 className="font-medium col-span-1">
        {name}
      </h1>
      <h className="text-sm">Your Role: Mentor</h>
      <div className="col-span-1 text-sm flex flex-col">
        <p>Group Members: 3</p>
        <p>Group Mentors: 5</p>
      </div>
      <div className="flex justify-end items-center">
        <PiSealWarningFill className="mr-1 text-yellow-400"/>
        <IoIosArrowForward />
      </div>
    </Link>
  );
}

export default ListTile;
