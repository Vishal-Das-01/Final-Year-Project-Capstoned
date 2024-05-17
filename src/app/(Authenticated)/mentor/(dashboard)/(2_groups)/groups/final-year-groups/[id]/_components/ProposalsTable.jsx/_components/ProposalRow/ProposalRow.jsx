"use client";
import React, { useState } from "react";
import { FaCircleXmark, FaDownload } from "react-icons/fa6";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import { convertDate } from "@/utils/helpers/date";
import { FaCheckCircle } from "react-icons/fa";
import { usePathname, useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { set } from "mongoose";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";

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
  const [loading, setLoading] = useState(false);

  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();
  const route = usePathname();

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

  const handleApproveOrReject = async (action) => {
    if (loading) return;
    const groupID = route.split("/")[4];
    setLoading(true);
    const accessToken = authDetails.accessToken;
    const response = await callAPI(
      "PATCH",
      accessToken,
      `${BACKEND_ROUTES.approveOrRejectProposalMentor}/${groupID}/${proposalID}`,
      { approval: action }
    );
    const responseData = await response.json();
    if (response.status === HttpStatusCode.Ok) {
      setLoading(false);
      router.refresh();
    } else if (response.status === HttpStatusCode.BadRequest) {
      setLoading(false);
      alert(responseData.message);
    } else if (response.status === HttpStatusCode.Unauthorized) {
      const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
        method: "POST",
      });
      if (responseLogOut.status === HttpStatusCode.Ok) {
        dispatch(removeAuthDetails());
        router.replace(FRONTEND_ROUTES.login_page);
      }
    } else if (response.status === HttpStatusCode.NotFound) {
      setLoading(false);
      alert(responseData.message);
    }
  };

  return (
    <>
      <tr class="border-b">
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
          class="px-4 w-5/12 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {title}
        </th>
        <td className="px-4 w-2/12 font-bold text-center text-blue-500">
          {status}
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
        {status === "Awaiting Approval" && role === "Supervisor" && (
          <>
            <td class="px-2 py-3 w-1/12">
              <div
                type="button"
                className="text-center justify-center items-center flex flex-row text-xl"
              >
                <FaCircleXmark
                  className={`h-6 w-6 col-span-1 flex items-center text-red-200 ${loading ? "" : "hover:text-red-500 hover:cursor-pointer"}`}
                  onClick={() => {
                    handleApproveOrReject("Rejected");
                  }}
                />
              </div>
            </td>
            <td class="px-2 py-3 w-1/12">
              <div
                type="button"
                className="text-center justify-center items-center flex flex-row text-xl"
              >
                <FaCheckCircle
                  className={`h-6 w-6 col-span-1 flex items-center text-green-200 ${loading ? "" : "hover:text-green-500 hover:cursor-pointer"}`}
                  onClick={() => {
                    handleApproveOrReject("Approved");
                  }}
                />
              </div>
            </td>
          </>
        )}
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
