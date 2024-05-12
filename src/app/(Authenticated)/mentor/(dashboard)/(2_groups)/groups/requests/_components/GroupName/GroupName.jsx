"use client";
import React, { useState } from "react";
import GroupDetailsModal from "../GroupDetailsModal/GroupDetailsModal";

function GroupName({ groupName }) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div className="col-span-3 flex items-center">
      <button
        className="text-base font-medium hover:cursor-pointer hover:text-blue-500"
        type="button"
        onClick={() => setOpenModal(true)}
      >
        {groupName}
      </button>
      {openModal && (
        <GroupDetailsModal openModal={openModal} setOpenModal={setOpenModal} />
      )}
    </div>
  );
}

export default GroupName;
