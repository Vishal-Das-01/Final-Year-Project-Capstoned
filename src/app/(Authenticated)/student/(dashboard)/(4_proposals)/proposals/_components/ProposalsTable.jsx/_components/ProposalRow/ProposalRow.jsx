"use client";
import React, { useState } from "react";
import { PiSealCheckFill } from "react-icons/pi";
import { PiSealFill } from "react-icons/pi";
import { FaDownload } from "react-icons/fa6";
import { MdCancel, MdCheckCircle, MdDescription, MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { FaCheckCircle, FaCross } from "react-icons/fa";

function ProposalRow({ title, description, status, selectedBy, mentorship, active }) {
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const list = [
    "Software Engineering",
    "Security",
    "Network Security",
    "Cloud Security",
    "Application Security",
    "Machine Learning",
    "Artificial Intelligence",
    "Mobile App Development",
    "Backend Engineering",
    "Frontend Engineering",
  ];

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
          class="px-2 w-4/12 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {title}
        </th>
        <td class="px-2 py-3 w-1/12">
          <div className="text-center justify-center items-center flex flex-row text-xs">
            {status ? (
              <div className="bg-green-200 p-1 rounded-lg">SELECTED</div>
            ) : (
              <div className="bg-red-200 p-1 rounded-lg">UNSELECTED</div>
            )}
          </div>
        </td>
        <td class="px-2 py-3 w-2/12 text-center">
          {selectedBy ? selectedBy : "N/A"}
        </td>
        <td class="px-2 py-3 w-1/12">
          <div className="text-center justify-center items-center flex flex-row text-xl">
            {status ? (
              <PiSealCheckFill className="text-green-600" />
            ) : (
              <PiSealFill className="text-red-600" />
            )}
          </div>
        </td>
        <td class="px-2 py-3 w-2/12">
          <div className="text-center justify-center items-center flex flex-row text-xl">
            <FaDownload className="text-black hover:text-blue-600" />
          </div>
        </td>
        <td class="px-2 py-3 w-1/12">
          <div className="text-center justify-center items-center flex flex-row text-xl">
            {active? <MdCheckCircle className="text-green-600"/> : <MdCancel className="text-red-600"/>}
          </div>
        </td>
        <td class="px-2 py-3 w-1/12">
          <div className="text-center justify-center items-center flex flex-row text-xl">
            {active? 
            <button className="flex flex-row p-1 items-center justify-center w-full h-full font-montserrat rounded-lg text-xs tracking-widest text-white bg-black  border-black hover:bg-white hover:border-black hover:text-black">
              Request
            </button> : 
            <button disabled className="flex flex-row p-1 items-center justify-center w-full h-full font-montserrat rounded-lg text-xs tracking-widest text-white bg-gray-400 px-2.5 py-1.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:click-events-none">
              Request
            </button>}
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
                  <p>
                    {description}
                  </p>
                </div>
                <div className="flex flex-col w-2/3 pl-5">
                  <p className="font-semibold">Industries</p>
                  <div>
                    {list.map((item, index) => {
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
                  <span>3:40 PM, Mon, 24th March</span>
                </p>
                <p>
                  <span className="font-semibold mr-2">Created At:</span>
                  <span>3:40 PM, Mon, 24th March</span>
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
