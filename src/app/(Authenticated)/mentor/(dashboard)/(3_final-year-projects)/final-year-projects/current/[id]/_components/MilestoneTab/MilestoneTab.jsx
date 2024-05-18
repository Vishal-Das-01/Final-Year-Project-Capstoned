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
import Loader from "@/app/(Authenticated)/mentor/(dashboard)/(2_groups)/groups/_components/Loader/Loader";
import { set } from "mongoose";

function MilestoneTab({ role, marked, milestoneNumber, assignedMilestoneID }) {
  const [isMarked, setIsMarked] = useState(marked);

  const [marksObtained, setMarksObtained] = useState(null);
  const [milestoneDetailsDisplay, setMilestoneDetailsDisplay] = useState(false);
  const [milestoneDetails, setMilestoneDetails] = useState(null);
  const [deadlinePassed, setDeadlinePassed] = useState(false);

  const [loading, setLoading] = useState(false);

  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {
    const getMilestoneDetails = async () => {
      setLoading(true);
      const accessToken = authDetails.accessToken;
      const response = await callAPI(
        "GET",
        accessToken,
        `${BACKEND_ROUTES.getMentorMilestoneDetails}/${assignedMilestoneID}`
      );
      if (response.status === HttpStatusCode.Ok) {
        const responseData = await response.json();
        setMarksObtained(responseData.data.obtainedMarks);
        setMilestoneDetails(responseData.data);
        handleDeadlinePassed(responseData.data.milestoneID.deadline);
        setLoading(false);
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

  const handleDeadlinePassed = (deadline) => {
    const currentDate = new Date();
    const deadlineDate = new Date(deadline);
    if (currentDate > deadlineDate) {
      setDeadlinePassed(true);
    }
  };

  return (
    <div>
      <div
        onClick={() => setMilestoneDetailsDisplay(!milestoneDetailsDisplay)}
        className="hover:bg-gray-100 border-2 rounded-full border-blue-500 h-16 flex flex-row items-center justify-between px-10 font-bold text-base"
      >
        <h1>Milestone - {milestoneNumber}</h1>
        <div className="flex flex-row items-center">
          {isMarked && (
            <div className="mr-5 group flex flex-row bg-red-500 text-white rounded-full px-2.5 py-1.5 text-sm space-x-3 items-center justify-center">
              <span>Marked</span>
              <TiTick />
            </div>
          )}
          {milestoneDetailsDisplay ? <IoIosArrowUp /> : <IoIosArrowDown />}
        </div>
      </div>
      {loading && <Loader />}
      {!loading && milestoneDetailsDisplay && milestoneDetails && (
        <div className="grid grid-cols-4 gap-y-5 my-7">
          <h2 className="font-semibold">Title:</h2>
          <h2 className="col-span-3">{milestoneDetails.milestoneID.title}</h2>
          <h2 className="font-semibold">Description:</h2>
          <h2 className="col-span-3">
            {milestoneDetails.milestoneID.description}
          </h2>
          <h2 className="font-bold">Deadline:</h2>
          <h2
            className={`col-span-3 font-semibold ${
              deadlinePassed ? "text-red-500" : "text-green-500"
            }`}
          >
            {convertDate(milestoneDetails.milestoneID.deadline)}
          </h2>
          <h2 className="font-semibold">Percentage:</h2>
          <h2 className="col-span-3">
            {milestoneDetails.milestoneID.percentage + "%"}
          </h2>
          <h2 className="font-semibold">Resources:</h2>
          <div className="col-span-3 flex flex-row">
            {milestoneDetails.milestoneID.resources.map((resource, index) => (
              <ResourceButton
                key={index}
                name={resource.name}
                link={resource.file}
              />
            ))}
          </div>
          <line className="col-span-4 border-t-2 border-gray-300"></line>
          {deadlinePassed && (
            <>
              <h2 className="font-semibold">Submission Files:</h2>
              {milestoneDetails.submitted ? (
                <div className="col-span-3 flex flex-row">
                  {milestoneDetails.submissionFile.map((item, index) => (
                    <ResourceButton
                      key={index}
                      name={item.name}
                      link={item.doc}
                    />
                  ))}
                </div>
              ) : (
                <h2 className="col-span-3 text-red-500">No files submitted.</h2>
              )}
              {marksObtained && (
                <>
                  <h2 className="font-semibold">Overall Marks:</h2>
                  <h2 className="col-span-3 font-bold text-red-500">
                    {`${marksObtained} / 100`}
                  </h2>
                </>
              )}
              <h2 className="font-semibold">Marks:</h2>
              <div className="col-span-3">
                <MarkSection
                  role={role}
                  isMarked={isMarked}
                  setIsMarked={setIsMarked}
                  assignedMilestoneID={assignedMilestoneID}
                  members={milestoneDetails.marks}
                  setMarksObtained={setMarksObtained}
                />
              </div>
            </>
          )}
        </div>
      )}
    </div>
  );
}

export default MilestoneTab;
