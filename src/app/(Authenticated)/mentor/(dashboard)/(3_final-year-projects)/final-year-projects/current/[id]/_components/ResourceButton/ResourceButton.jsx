'use client';

import { getFile } from "@/utils/firebase/getFile";
import React from "react";
import { FaDownload } from "react-icons/fa";

function ResourceButton({ name, link, extension }) {

  const handleDownload = async () => {
    const subExtension = extension.split('.')[1];

    await getFile(link, name, `application/${subExtension}`);
  };

  return (
    <button
      onClick={handleDownload}
      className="group inline-flex flex-row border-2 border-blue-500 rounded-full px-2.5 py-1.5 text-xs space-x-3 items-center justify-center hover:bg-blue-500 hover:text-white"
    >
      <span>{name}</span>
      <FaDownload className="text-blue-500 group-hover:text-white" />
    </button>
  );
}

export default ResourceButton;
