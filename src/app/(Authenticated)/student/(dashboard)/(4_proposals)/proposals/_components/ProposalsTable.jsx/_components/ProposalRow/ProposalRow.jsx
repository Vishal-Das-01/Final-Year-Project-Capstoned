"use client";
import React, { useEffect, useState } from "react";
import { PiSealCheckFill } from "react-icons/pi";
import { PiSealFill } from "react-icons/pi";
import { FaDownload } from "react-icons/fa6";
import { MdCancel, MdCheckCircle, MdDescription, MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { FaCheckCircle, FaCross } from "react-icons/fa";
import { convertDate } from "@/utils/helpers/date";
import toast from "react-hot-toast";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { set } from "mongoose";

function ProposalRow({
  proposalID,
  groupID,
  title,
  description,
  edit,
  industries,
  proposedBy,
  mentorship,
  proposalDoc,
  createdAt,
  updatedAt,
}) {
  const [expanded, setExpanded] = useState(false);
  const [isInGroup, setIsInGroup] = useState(false);
  const [disabled, setDisabled] = useState(!edit);

  useEffect(() => {
    if (groupID) setIsInGroup(true);
    else setIsInGroup(false);
  }, [groupID]);

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

  const authDetails = useSelector((state) => state.AuthDetails);
  const router = useRouter();
  const dispatch = useDispatch();

  const onRequest = async () => {
    setDisabled(true);
    if (isInGroup && edit) {
      const accessToken = authDetails.accessToken;
      const response = await callAPI(
        "POST",
        accessToken,
        `${BACKEND_ROUTES.studentRequestProposal}/${proposalID}`,
      );
      if (response.status === HttpStatusCode.Ok) {
        toast.success("Request sent successfully.");
        setDisabled(false);
        router.refresh();
      } else if (response.status === HttpStatusCode.BadRequest) {
        const responseData = await response.json();
        toast.error(responseData.message);
      } else if (response.status === HttpStatusCode.Unauthorized) {
        dispatch(removeAuthDetails());
        router.push(FRONTEND_ROUTES.login_page);
      }
    } else toast.error("You must be in a group to request a proposal.");

    setDisabled(false);
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
        <th
          scope="row"
          class="px-2 w-4/12 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {title}
        </th>
        <td class="px-2 py-3 w-1/12">
          <div className="text-center justify-center items-center font-bold text-blue-500 flex flex-row text-xs">
            {proposedBy.isUniversityTeacher ? "Teacher" : "Industry"}
          </div>
        </td>
        <td class="px-2 py-3 w-2/12 text-center">
          {proposedBy.firstName} {proposedBy.lastName}
        </td>
        <td class="px-2 py-3 w-1/12">
          <div className="text-center justify-center items-center flex flex-row text-xl">
            {mentorship ? (
              <PiSealCheckFill className="text-green-600" />
            ) : (
              <PiSealFill className="text-red-600" />
            )}
          </div>
        </td>
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
          <div className="text-center justify-center items-center flex flex-row text-xl">
            <button
              onClick={onRequest}
              disabled={disabled}
              className="flex flex-row p-1 items-center justify-center w-full h-full font-montserrat rounded-lg text-xs tracking-widest text-white bg-black  border-black hover:bg-white hover:border-black hover:text-black disabled:opacity-50 disabled:cursor-not-allowed disabled:bg-gray-300 disabled:border-gray-300 disabled:text-black"
            >
              Request
            </button>
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
