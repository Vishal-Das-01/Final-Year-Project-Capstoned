"use client";
import React, { useState } from "react";
import { PiSealCheckFill } from "react-icons/pi";
import { PiSealFill } from "react-icons/pi";
import { FaDownload } from "react-icons/fa6";
import { MdDescription, MdEdit } from "react-icons/md";
import { MdDelete } from "react-icons/md";
import { IoMdArrowDropdown } from "react-icons/io";
import { IoMdArrowDropup } from "react-icons/io";
import ProposalModal from "../../../ProposalModal/ProposalModal";
import { convertDate } from "@/utils/helpers/date";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "@/utils/helpers/callAPI";
import { HttpStatusCode } from "axios";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { deleteFile } from "@/utils/firebase/deleteFile";

function ProposalRow({
  proposalID,
  title,
  description,
  industries,
  edit,
  selectedBy,
  mentorship,
  createdAt,
  updatedAt,
  proposalDoc,
}) {
  const [expanded, setExpanded] = useState(false);
  const [openModal, setOpenModal] = useState(false);

  const router = useRouter();
  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();

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

  const handleDelete = async () => {
    const accessToken = authDetails.accessToken;
    const response = await callAPI(
      "DELETE",
      accessToken,
      BACKEND_ROUTES.deleteProposalMentor,
      { proposalID }
    );
    const responseData = await response.json();
    console.log(response, responseData);
    if (response.status === HttpStatusCode.Ok) {
      await deleteFile(proposalDoc.file);
      router.refresh();
    }
    if (response.status === HttpStatusCode.Unauthorized) {
      const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
        method: "POST",
      });
      if (responseLogOut.status === HttpStatusCode.Ok) {
        dispatch(removeAuthDetails());
        router.replace(FRONTEND_ROUTES.landing_page);
      }
    }
  };

  return (
    <>
      {openModal && (
        <ProposalModal
          setOpenModal={setOpenModal}
          oldTitle={title}
          oldDescription={description}
          oldMentorship={mentorship}
          oldList={list}
        />
      )}
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
          class="px-2 w-4/12 font-medium text-gray-900 whitespace-nowrap dark:text-white"
        >
          {title}
        </th>
        <td class="px-2 py-3 w-1/12">
          <div className="text-center justify-center items-center flex flex-row text-xs">
            {!edit ? (
              <div className="bg-red-500 py-1 px-2 rounded-lg text-white font-bold">UNAVAILABLE</div>
            ) : (
              <div className="bg-green-500 py-1 px-2 rounded-lg text-white font-bold">AVAILABLE</div>
            )}
          </div>
        </td>
        <td class="px-2 py-3 w-2/12 text-center">
          {selectedBy ? selectedBy : "N/A"}
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
          <div className="flex flex-row space-x-3 w-full justify-end text-xl">
            {/* <MdEdit
              className="text-gray-400 hover:text-green-600"
              onClick={() => setOpenModal(true)}
            /> */}
            <button disabled={!edit} type="button">
              <MdDelete
                className={`text-gray-400 ${edit ? "hover:text-red-600" : ""}`}
                onClick={handleDelete}
              />
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
