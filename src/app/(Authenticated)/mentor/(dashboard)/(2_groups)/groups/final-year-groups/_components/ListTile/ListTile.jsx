import React from "react";
import { IoIosArrowForward } from "react-icons/io";
import { PiSealWarningFill } from "react-icons/pi";
import Link from "next/link";

function ListTile({ id, details, role }) {

  return (
    <Link href={`final-year-groups/${id}`} className="font-montserrat mb-4 mt-1 mx-1 h-1/5 rounded-xl shadow-lg bg-gray-100 hover:bg-gray-300 grid grid-cols-4 items-center justify-between px-5 text-lg">
      <h1 className="font-medium col-span-1">
        {details.name}
      </h1>
      <div className="col-span-1 text-sm flex flex-col">
        <p>Your Role: {role}</p>
        {(role !== "Supervisor") && <p>Supervisor: {details.supervisor.firstName} {details.supervisor.lastName}</p>}
      </div>
      <div className="col-span-1 text-sm flex flex-col">
        <p>Group Members: {details.members.length + 1}</p>
        <p>Group Mentors: {details.mentors.length}</p>
      </div>
      <div className="flex justify-end items-center">
        <PiSealWarningFill className="mr-1 text-yellow-400"/>
        <IoIosArrowForward />
      </div>
    </Link>
  );
}

export default ListTile;
