import React from "react";
import styles from "./Requests.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import GroupName from "./_components/GroupName/GroupName";

export const metadata = {
  title: "Final Year Groups: Requests",
  description:
    "Capstoned Mentor Requests | Final Year Project (FYP) Management Platform for College & University Students.",
};

function Requests() {
  const list = [
    {
      groupName: "Tech Titans",
      name: "David Lee",
      requestType: "Supervisor",
    },
    {
      groupName: "Pixel Pioneers",
      name: "Emily Brown",
      requestType: "Mentor",
    },
    {
      groupName: "Byte Brigade",
      name: "Michael Johnson",
      requestType: "Supervisor",
    },
    {
      groupName: "Code Crusaders",
      name: "John Doe",
      requestType: "Mentor",
    },
    {
      groupName: "Digital Dynamos",
      name: "Jane Smith",
      requestType: "Supervisor",
    },
    {
      groupName: "Innovation Instigators",
      name: "David Lee",
      requestType: "Supervisor",
    },
  ];

  return (
    <div className={`${styles.container} m-4 overflow-y-auto`}>
      {list.map((item, index) => (
        <div key={index}>
          <div className="grid grid-cols-11 h-16 mt-1 mx-1 rounded-full shadow-lg bg-gray-100 pr-5 pl-10">
            <GroupName groupName={item.groupName} />
            <h className="col-span-3 text-sm flex items-center">
              Requested by: {item.name}
            </h>
            <h className="col-span-3 text-sm flex items-center">
              Requested for: {item.requestType}
            </h>
            <div className="col-span-1 flex items-center">
              <FaCircleXmark className="h-6 w-6 col-span-1 flex items-center text-red-200 hover:text-red-500 hover:cursor-pointer" />
            </div>
            <div className="col-span-1 flex items-center">
              <FaCheckCircle className="h-6 w-6 col-span-1 flex items-center text-green-200 hover:text-green-500 hover:cursor-pointer" />
            </div>
          </div>
          <hr className="mt-5 mb-4 text-center border-gray-300 border-t-2 border-b-0" />
        </div>
      ))}
    </div>
  );
}

export default Requests;
