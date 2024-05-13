import Image from "next/image";
import React from "react";

function GroupDetails() {
  return (
    <div className="h-full gap-1 flex flex-col items-start text-center justify-start ml-14 pb-10 font-montserrat">
      <h className="text-base">FYP Management System</h>
      <h1 className="text-sm">The User Friendlies</h1>
      <h1
        className="font-bold text-sm bg-blue-100 p-2 text-blue-500"
        style={{ width: "max-content" }}
      >
        In Progress
      </h1>

      <div className="flex-1" />

      <div className="flex flex-row">
        <Image
          className="rounded-full -mr-3 border-4 border-white"
          src="/defaultProfile.jpg"
          alt="Failed to load image"
          width={50}
          height={50}
          
        />
        <Image
          className="rounded-full -mr-3 border-4 border-white"
          src="/defaultProfile.jpg"
          alt="Failed to load image"
          width={50}
          height={50}
        />
        <Image
          className="rounded-full -mr-3 border-4 border-white"
          src="/defaultProfile.jpg"
          alt="Failed to load image"
          width={50}
          height={50}
        />
        <Image
          className="rounded-full -mr-3 border-4 border-white"
          src="/defaultProfile.jpg"
          alt="Failed to load image"
          width={50}
          height={50}
        />
        <Image
          className="rounded-full -mr-3 border-4 border-white"
          src="/defaultProfile.jpg"
          alt="Failed to load image"
          width={50}
          height={50}
        />
      </div>
    </div>
  );
}

export default GroupDetails;
