"use client"
import React, { useEffect, useState } from "react";
import styles from "./Requests.module.css";
import { FaCheckCircle } from "react-icons/fa";
import { FaCircleXmark } from "react-icons/fa6";
import GroupName from "./_components/GroupName/GroupName";
import Image from "next/image";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
// import { cookies } from "next/headers";
import NotFound from "./_components/NotFound/NotFound";
import { useDispatch, useSelector } from "react-redux";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { useRouter } from "next/navigation";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { set } from "mongoose";

// export const metadata = {
//   title: "Final Year Groups: Requests",
//   description:
//     "Capstoned Mentor Requests | Final Year Project (FYP) Management Platform for College & University Students.",
// };

function Requests() {

  const [requests, setRequests] = useState(null);
  const [processing, setProcessing] = useState(false);
  // const requests = await getRequests();

  const router = useRouter();
  const dispatch = useDispatch();

  const authDetails = useSelector((state) => state.AuthDetails);

  useEffect( () => {
    const getRequests = async () => {
      const accessToken = authDetails.accessToken;
      const response = await callAPI("GET", accessToken, BACKEND_ROUTES.getReceivedRequest);
      if (response.status === HttpStatusCode.Ok) {
        const responseData = await response.json();
        console.log(responseData);
        setRequests(responseData.data);
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
    }

    getRequests();

  }, [authDetails.accessToken, dispatch, router]);

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

  const handleDelete = async (id) => {
    setProcessing(true);
    const accessToken = authDetails.accessToken;
    const response = await callAPI("DELETE", accessToken, `${BACKEND_ROUTES.deleteRequest}?id=${id}`);
    if (response.status === HttpStatusCode.Ok) {
      setRequests(requests.filter((item) => item._id !== id));
      setProcessing(false);
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

  }

  const handleAccept = async (id) => {
    setProcessing(true);
    const accessToken = authDetails.accessToken;
    const response = await callAPI("PATCH", accessToken, `${BACKEND_ROUTES.acceptRequest}?id=${id}`);
    if (response.status === HttpStatusCode.Ok) {
      setRequests(requests.filter((item) => item._id !== id));
      setProcessing(false);
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
  }

  return (
    
    <div className={`${styles.container} m-4 overflow-y-auto`}>
      {requests && requests.length === 0 && <NotFound />}
      {requests && requests.map((item, index) => (
        <div key={index}>
          <div className="grid grid-cols-12 h-16 mt-1 mx-1 rounded-full shadow-lg bg-gray-100 pr-5 pl-10">
            <div className="col-span-1 flex items-center">
              <div className="relative h-12 w-12 rounded-full overflow-hidden">
                <Image
                  className="absolute"
                  src={(item.sender.profileImage?.image) ? item.sender.profileImage.image : "/defaultProfile.jpg"}
                  alt="profile"
                  fill
                />
              </div>
            </div>
            <GroupName groupName={item.sender.group.name} groupID={item.sender.group._id}/>
            <h className="col-span-3 text-sm flex items-center">
              Requested by: {item.sender.firstName} {item.sender.lastName}
            </h>
            <h className="col-span-3 text-sm flex items-center">
              Requested for: {item.type}
            </h>
            <div className="col-span-1 flex items-center">
              <FaCircleXmark disabled={processing} className={`h-6 w-6 col-span-1 flex items-center text-red-200 ${!processing? "hover:text-red-500 hover:cursor-pointer" : ""}`} onClick={() => handleDelete(item._id)}/>
            </div>
            <div className="col-span-1 flex items-center">
              <FaCheckCircle disabled={processing} className={`h-6 w-6 col-span-1 flex items-center text-green-200 ${!processing? "hover:text-green-500 hover:cursor-pointer" : ""}`} onClick={() => handleAccept(item._id)}/>
            </div>
          </div>
          <hr className="mt-5 mb-4 text-center border-gray-300 border-t-2 border-b-0" />
        </div>
      ))}
    </div>
  );
}

export default Requests;

// async function getRequests () {
//   const accessToken = cookies().get("accessToken")?.value;
//   const response = await callAPI("GET", accessToken, BACKEND_ROUTES.getReceivedRequest);
//   if (response.status === HttpStatusCode.Ok) {
//     const responseData = await response.json();
//     return responseData;
//   }
//   if (response.status === HttpStatusCode.Unauthorized) {
//     redirect(FRONTEND_ROUTES.login_page);
//   }
// }

