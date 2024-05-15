"use client";
import React, { useState } from "react";
import { FaCircleXmark, FaDownload } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { convertDate } from "@/utils/helpers/date";
import { FaCheckCircle } from "react-icons/fa";
import { useRouter } from "next/navigation";

function ProposalRow({
  proposalID,
  title,
  description,
  createdAt,
  updatedAt,
  proposalDoc,
  industries,
  status,
  role,
}) {
  const [expanded, setExpanded] = useState(false);
  const router = useRouter();

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

  const handleApproval = (action) => {
    if (role !== "Mentor" && status !== "Pending") {
      console.log(action);
      router.refresh();
    }
  };

  return (
    <>
      <tr class="border-b dark:border-gray-700 hover:bg-gray-100">
        <td class="px-2 py-3 w-1/12">
          {expanded ? (
            <IoMdArrowDropup
              className="w-4 h-4 text-xl text-gray-400 hover:text-green-600"
              onClick={() => setExpanded(false)}
            />
          ) : (
            <IoMdArrowDropdown
              className="w-4 h-4 text-xl text-gray-400 hover:text-green-600"
              onClick={() => setExpanded(true)}
            />
          )}
        </td>
        <th
          scope="row"
          class="px-4 w-5/12 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {title}
        </th>
        <td className="px-4 w-2/12 font-bold text-center text-blue-500">{status}</td>
        <td class="px-2 py-3 w-2/12">
          <div className="text-center justify-center items-center flex flex-row text-xl">
            <a
              href={proposalDoc?.file}
              target="_blank"
              rel="noopener noreferrer"
              className="text-black hover:text-blue-600"
            >
              <FaDownload />
            </a>
          </div>
        </td>
        <td class="px-2 py-3 w-1/12">
          <div
            type="button"
            className="text-center justify-center items-center flex flex-row text-xl"
          >
            <FaCircleXmark
              className={`h-6 w-6 col-span-1 flex items-center text-red-200 ${
                role === "Supervisor" && status !== "Pending"
                  ? "hover:text-red-500 hover:cursor-pointer"
                  : ""
              }`}
              onClick={() => handleApproval("reject")}
            />
          </div>
        </td>
        <td class="px-2 py-3 w-1/12">
          <div
            type="button"
            className="text-center justify-center items-center flex flex-row text-xl"
          >
            <FaCheckCircle
              className={`h-6 w-6 col-span-1 flex items-center text-green-200 ${
                role === "Supervisor" && status !== "Pending"
                  ? "hover:text-green-500 hover:cursor-pointer"
                  : ""
              }`}
              onClick={() => handleApproval("accept")}
            />
          </div>
        </td>
      </tr>
      {expanded && (
        <tr>
          <td colspan="7">
            <div className="flex space-y-7 bg-white text-black flex-col w-full border-b-2 p-5">
              <div className=" w-full flex flex-row items-start justify-center">
                <div className="flex flex-col w-1/3 justify-center">
                  <p className="font-semibold">Description</p>
                  <p>{description}</p>
                </div>
                <div className="flex flex-col w-2/3 pl-5">
                  <p className="font-semibold">Industries</p>
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
              </div>
              <div className="flex flex-row w-full items-center justify-evenly">
                <p>
                  <span className="font-semibold mr-2">Last Modified:</span>
                  <span>{convertDate(updatedAt)}</span>
                </p>
                <p>
                  <span className="font-semibold mr-2">Created At:</span>
                  <span>{convertDate(createdAt)}</span>
                </p>
              </div>
            </div>
          </td>
        </tr>
      )}
    </>
  );
}

export default ProposalRow;
