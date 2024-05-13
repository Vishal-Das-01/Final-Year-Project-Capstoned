import React from "react";
import { FaDownload } from "react-icons/fa";

function ResourceButton({ name }) {
  return (
    <button className="group mr-5 flex flex-row border-2 border-blue-500 rounded-full px-2.5 py-1.5 text-sm space-x-3 items-center justify-center hover:bg-blue-500 hover:text-white">
      <span>{name}</span>
      <FaDownload className="text-blue-500 group-hover:text-white" />
    </button>
  );
}

export default ResourceButton;
