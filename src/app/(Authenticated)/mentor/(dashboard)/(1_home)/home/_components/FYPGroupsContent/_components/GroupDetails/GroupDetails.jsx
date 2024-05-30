import Image from "next/image";
import React from "react";

function GroupDetails({projectTitle, groupName, groupMembers, groupLead, role}) {


  return (
    <div className="flex flex-col items-start justify-start h-full gap-1 pb-10 text-center ml-14 font-montserrat">
      {projectTitle && <h className="text-lg font-medium text-blue-500">{projectTitle}</h>}
      <h1 className="text-base">{groupName}</h1>
      <h1
        className={`font-bold text-sm p-2 ${ role === 'Mentor' ? "bg-blue-100 text-blue-500" : "bg-red-100 text-red-500"}`}
        style={{ width: "max-content" }}
      >
        {role}
      </h1>

      <div className="flex-1" />

      <div className="flex flex-row">
        <Image
          className={`rounded-full ${ groupMembers.length === 0 ? "" : "-mr-3"} border-4 border-white`}
          src={groupLead.profileImage?.image || "/defaultProfile.jpg"}
          alt="Failed to load image"
          width={50}
          height={50}
          
        />
        {groupMembers.map((member, index) => (
          <Image
            key={index}
            className="-mr-3 border-4 border-white rounded-full"
            src={member.profileImage?.image || "/defaultProfile.jpg"}
            alt="Failed to load image"
            width={50}
            height={50}
          />
        ))}
      </div>
    </div>
  );
}

export default GroupDetails;
