"use client";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function MarkSection({ role, isMarked, setIsMarked, assignedMilestoneID, members, setMarksObtained }) {
  const [marking, setMarking] = useState(false);
  const [marks, setMarks] = useState(
    members.map((item) => ({ member: item.member._id, marks: item.marks }))
  );

  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleChange = (id, mark) => {
    if (mark <= 100 && mark >= 0) {
      setMarks((prevStates) =>
        prevStates.map((item) =>
          item.member === id ? { ...item, marks: mark } : item
        )
      );
    }
  };

  const returnMarks = (id,marks) => {
    for (const x of marks) {
      if (x.member == id) {
        return x.marks;
      }
    }
    return "-";
  }

  const handleMarkSubmission = async () => {
    const accessToken = authDetails.accessToken;
    const response = await callAPI('PATCH', accessToken, `${BACKEND_ROUTES.postMentorMilestoneMarks}/${assignedMilestoneID}`, marks);
    if (response.status === HttpStatusCode.Ok) {
      setIsMarked(true);
      const responseData = await response.json();
      setMarksObtained(responseData.obtainedMarks);
    } else if (response.status === HttpStatusCode.Unauthorized) {
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
    <div className="flex flex-row">
      <table className="border-4 border-double border-gray-500 mr-5">
        <thead>
          <tr className="bg-blue-500 text-white">
            <th className="w-36">Members</th>
            <th className="w-36">Marks Obtained</th>
            <th className="w-36">Total Marks</th>
          </tr>
        </thead>
        <tbody>
          {members.map((item, index) => (
            <tr key={index}>
              <td className="pt-2 pl-2">
                {item.member.firstName} {item.member.lastName}
              </td>
              {marking ? (
                <td className="p-2">
                  <input
                    className="border-2 text-center border-gray-300 w-36 focus:border-blue-500 focus:ring-0"
                    type="number"
                    required
                    min={0}
                    max={100}
                    onChange={(e) =>
                      handleChange(item.member._id, e.target.value)
                    }
                  />
                </td>
              ) : (
                <td className="text-center pt-2">
                  {isMarked
                    ? returnMarks(item.member._id,marks)
                    : "-"}
                </td>
              )}
              <td className="text-center pt-2">100</td>
            </tr>
          ))}
        </tbody>
      </table>
      {role === "Supervisor" && (marking ? (
        <div className="flex flex-row">
          <button
            onClick={() => setMarking(false)}
            className="mr-5 h-10 flex flex-row border-2 border-blue-500 text-black rounded-full px-2.5 py-1.5 text-sm hover:bg-gray-300 items-center"
          >
            Cancel
          </button>
          <button
            onClick={async () => {
              await handleMarkSubmission();
              setMarking(false);
            }}
            className="h-10 bg-green-500 text-white rounded-full px-2.5 py-1.5 text-sm hover:bg-green-700"
          >
            Save
          </button>
        </div>
      ) : (
        <button
          onClick={() => setMarking(true)}
          className="h-10 bg-red-500 text-white rounded-full px-2.5 py-1.5 text-sm hover:bg-red-700"
        >
          {isMarked ? "Edit" : "Mark"}
        </button>
      ))}
    </div>
  );
}

export default MarkSection;
