import DownloadButton from "@/app/(Authenticated)/mentor/(dashboard)/(4_my-proposals)/my-proposals/_components/ProposalsTable.jsx/_components/DownloadButton/DownloadButton";
import Image from "next/image";
import React, { useState } from "react";
import { IoMdArrowDropdown, IoMdArrowDropup } from "react-icons/io";
import ChatButton from "../ChatButton/ChatButton";

function StudentRow({
  studentID,
  profileImage,
  name,
  gender,
  erp,
  gpa,
  resume,
  industries,
  group,
  type
}) {
  const [expanded, setExpanded] = useState(false);

  const tailwindColorClasses = [
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-indigo-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-gray-100",
  ];

  const generateRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * tailwindColorClasses.length);
    return tailwindColorClasses[randomIndex];
  };

  return (
    <>
      <tr class="h-16 border-b dark:border-gray-700 hover:bg-gray-100">
        <td class="px-2 py-3 w-1/12">
          {expanded ? (
            <IoMdArrowDropup
              className="w-6 h-6 text-xl text-gray-400 hover:text-green-600"
              onClick={() => setExpanded(false)}
            />
          ) : (
            <IoMdArrowDropdown
              className="w-6 h-6 text-xl text-gray-400 hover:text-green-600"
              onClick={() => setExpanded(true)}
            />
          )}
        </td>
        <td class="w-1/12">
          <Image
            className="rounded-full"
            src={profileImage ? profileImage.image : "/defaultProfile.jpg"}
            alt="Profile Image"
            width={40}
            height={40}
          />
        </td>
        <th
          scope="row"
          className="w-4/12 px-2 text-base font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {name}
        </th>
        <td className="w-1/12 text-sm font-normal text-center text-gray-900 dark:text-white">
          {gender}
        </td>
        <td className="w-1/12 text-sm font-normal text-center text-gray-900 dark:text-white">
          {erp}
        </td>
        <td className="w-1/12 text-sm font-medium text-center text-gray-900 dark:text-white">
          {gpa}
        </td>
        <td className="w-2/12 px-2 text-sm font-normal text-center text-gray-900 whitespace-nowrap dark:text-white">
          {group?.name || "N/A"}
        </td>
        <td class="px-2 py-3 w-1/12">
          <div className="flex flex-row items-center justify-center text-xl text-center">
            <DownloadButton fileName={erp + "_resume"} fileUrl={resume?.file} />
          </div>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colspan="8">
            <div className="flex flex-col w-full px-10 py-5 text-black bg-white border-b-2 space-y-7">
              <div className="flex flex-col">
                <p className="font-semibold">
                  Industries
                  {industries.length === 0 && (
                    <span className="ml-3 text-sm font-normal">
                      No industries selected
                    </span>
                  )}
                </p>
                <div>
                  {industries.map((item, index) => {
                    const randomColorClass = generateRandomColor();
                    return (
                      <p
                        key={index}
                        className={`${randomColorClass} inline-flex justify-center items-center rounded-xl p-2 text-xs mr-2 my-1`}
                      >
                        {item}
                      </p>
                    );
                  })}
                </div>
              </div>
              <div className="flex flex-row items-center justify-end w-full">
                <ChatButton id={studentID} type={type}/>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default StudentRow;
