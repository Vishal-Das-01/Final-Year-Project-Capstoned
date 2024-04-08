'use client';

import { useState, useEffect } from "react";
import { useSocket } from "@/utils/helpers/socketProvider";
import { api } from "@/utils/helpers/axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";

const Test = () => {
  const profileID = '65e247acdaacb8bc02e40b88'

  const { socket, isConnected } = useSocket();
  const [request, setRequest] = useState({});

  const sendRequest = async () => {
    try {
      const response = await api.post(BACKEND_ROUTES.sendRequest, 
        {receiver: "65e247acdaacb8bc02e40b88", type: "Group Member"}, 
        {headers: {'Authorization': 'Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6InQubWlyemEuMjI4MDhAa2hpLmliYS5lZHUucGsiLCJyb2xlIjoiU3R1ZGVudCIsInByb2ZpbGVJRCI6IjY1ZGY0YjUzM2M1MTNiOGIwZDgzYjY5ZSIsImlhdCI6MTcxMjU0MDA4N30.bChye3Mr-J2dl_p8yqEEqXTY2OIaIXn9GA_djC8W7go'}}
      )
      console.log("Response", response)
    } catch (error) {
      console.log("Error", error.response)
    }
  }

  useEffect(() => {
    if(socket) {
      socket.on(`request:${profileID}`, (request) => {
        console.log(request)
        setRequest(request);
      })
    }
  }, [socket])

  if(!isConnected) {
    return (
      <>
        <h1>Not Connected</h1>
      </>
    )
  }

  return (
    <>
      <h1>{request._id ?? ''}</h1>
      <h1>{request.sender ?? ''}</h1>
      <h1>{request.receiver ?? ''}</h1>
      <h1>{request.type ?? ''}</h1>
      <button onClick={sendRequest}>Send Request</button>
    </>
  )
}

export default Test;