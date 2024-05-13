import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { PiSealWarningFill } from "react-icons/pi";
import Link from "next/link";

function ListTile({ name, group, progress, onClick }) {
  return (
    <Link href="past/123" className="font-montserrat mb-4 mt-1 mx-1 h-1/5 rounded-xl shadow-lg bg-gray-100 hover:bg-gray-300 grid grid-cols-5 items-center justify-between px-5 text-lg">
      <h1 className="font-medium col-span-3">
        {name} - {group}
      </h1>
      <div className="font-light text-base flex flex-row">
        <pre className="font-montserrat">Grade: </pre>
        <p className="text-red-500">A</p>
      </div>
      <div className="flex justify-end items-center">
        <PiSealWarningFill className="mr-1 text-yellow-400"/>
        <IoIosArrowForward />
      </div>
    </Link>
  );
}

export default ListTile;
