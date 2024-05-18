"use client";
import React, { useEffect } from "react";
import { IoIosArrowDown, IoIosArrowUp } from "react-icons/io";
import { TiTick } from "react-icons/ti";
import { useState } from "react";
import ResourceButton from "../ResourceButton/ResourceButton";
import MarkSection from "../MarkSection/MarkSection";
import { convertDate } from "@/utils/helpers/date";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "@/utils/helpers/callAPI";
import { useRouter } from "next/navigation";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";

function MilestoneTab({ marked, milestoneNumber, assignedMilestoneID }) {
  const [milestoneDetailsDisplay, setMilestoneDetailsDisplay] = useState(false);
  const [milestoneDetails, setMilestoneDetails] = useState(null);

  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getMilestoneDetails = async () => {
      const accessToken = authDetails.accessToken;
      const response = await callAPI(
        "GET",
        accessToken,
        `${BACKEND_ROUTES.getMentorMilestoneDetails}/${assignedMilestoneID}`
      );
      if (response.status === HttpStatusCode.Ok) {
        const responseData = await response.json();
        setMilestoneDetails(responseData.data);
        console.log(responseData.data);
      } else if (response.status === HttpStatusCode.Unauthorized) {
        dispatch(removeAuthDetails());
        router.push(FRONTEND_ROUTES.login_page);
      }
    };

    if (milestoneDetailsDisplay) {
      getMilestoneDetails();
    } else console.log("nothing happens");
  }, [
    milestoneDetailsDisplay,
    authDetails.accessToken,
    dispatch,
    router,
    assignedMilestoneID,
  ]);

  return (
    <div>
      <div
        onClick={() => setMilestoneDetailsDisplay(!milestoneDetailsDisplay)}
        className="hover:bg-gray-100 border-2 rounded-full border-blue-500 h-16 flex flex-row items-center justify-between px-10 font-bold text-base"
      >
        <h1>Milestone - {milestoneNumber}</h1>
        <div className="flex flex-row items-center">
          {marked && (
            <div className="mr-5 group flex flex-row bg-red-500 text-white rounded-full px-2.5 py-1.5 text-sm space-x-3 items-center justify-center">
              <span>Marked</span>
              <TiTick />
            </div>
          )}
          {milestoneDetailsDisplay ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {milestoneDetailsDisplay && milestoneDetails && (
        <div className="grid grid-cols-4 gap-y-5 my-7">
          <h2 className="font-semibold">Title:</h2>
          <h2 className="col-span-3">{milestoneDetails.milestoneID.title}</h2>
          <h2 className="font-semibold">Description:</h2>
          <h2 className="col-span-3">
            {milestoneDetails.milestoneID.description}
          </h2>
          <h2 className="font-semibold">Deadline:</h2>
          <h2 className="col-span-3">
            {convertDate(milestoneDetails.milestoneID.deadline)}
          </h2>
          <h2 className="font-semibold">Percentage:</h2>
          <h2 className="col-span-3">
            {milestoneDetails.milestoneID.percentage + "%"}
          </h2>
          <h2 className="font-semibold">Resources:</h2>
          <div className="col-span-3 flex flex-row">
            <ResourceButton name="Template" />
            <ResourceButton name="Guidelines" />
          </div>
          <line className="col-span-4 border-t-2 border-gray-300"></line>
          <h2 className="font-semibold">Submission Files:</h2>
          <div className="col-span-3 flex flex-row">
            <ResourceButton name="Software Requirement Specification" />
          </div>
          <h2 className="font-semibold">Marks:</h2>
          <div className="col-span-3">
            <MarkSection isMarked={milestoneDetails.marked} />
          </div>
        </div>
      )}
    </div>
  );
}

export default MilestoneTab;
