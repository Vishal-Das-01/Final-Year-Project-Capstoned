import Image from "next/image";
import React from "react";

function GroupDetails({studentID, projectTitle, groupName, groupMembers, groupLead, groupSupervisor}) {

  let role = "Group Member";

  if (studentID == groupLead._id) {
    role = "Group Lead";
  }

  return (
    <div className="flex flex-col items-start justify-start h-full gap-1 pb-10 text-center mx-7 font-montserrat">
      {projectTitle && <h className="text-lg font-medium text-blue-500">{projectTitle}</h>}
      <h1 className="text-base">{groupName}</h1>
      {groupSupervisor && <h1 className="text-base text-gray-500">Supervisor: {groupSupervisor.firstName} {groupSupervisor.lastName}</h1>}
      <h1
        className={`font-bold text-sm p-2 ${ role === 'Group Member' ? "bg-blue-100 text-blue-500" : "bg-red-100 text-red-500"}`}
        style={{ width: "max-content" }}
      >
        {role}
      </h1>

      <div className="flex-1" />

      <div className="flex flex-row">
        {groupSupervisor && 
        <Image
          className={`rounded-full -mr-3 border-4 border-red-600`}
          src={groupSupervisor.profileImage?.image || "/defaultProfile.jpg"}
          alt="Failed to load image"
          width={50}
          height={50}
        />}
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
