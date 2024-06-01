"use client";
import React, { useState } from "react";
import { IoAdd } from "react-icons/io5";
import ProposalModal from "../ProposalModal/ProposalModal";

function HelpingButton({group}) {
  const [openModal, setOpenModal] = useState(false);

  return (
    <div>
      <button
        onClick={() => {
          setOpenModal(true);
        }}
        type="button"
        className="flex flex-row p-1 items-center justify-center w-full h-full font-montserrat font-semibold rounded-lg text-sm tracking-widest text-white bg-black border-4 border-black hover:bg-white hover:border-4 hover:border-black hover:text-black"
      >
        <IoAdd className="mr-2 w-4 h-4" />
        {!group ? "Edit Group": "Create Group"}
      </button>
      {openModal && <ProposalModal setOpenModal={setOpenModal} />}
    </div>
  );
}

export default HelpingButton;
