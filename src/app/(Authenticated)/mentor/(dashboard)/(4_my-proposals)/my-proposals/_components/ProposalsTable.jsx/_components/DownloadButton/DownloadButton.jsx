import { getFile } from "@/utils/firebase/getFile";
import React from "react";
import { FaDownload } from "react-icons/fa";

function DownloadButton({ fileName, fileUrl }) {
  const handleDownload = async () => {
    await getFile(fileUrl, fileName, "application/pdf");
  };

  return (
    <button onClick={handleDownload} className="text-black hover:text-blue-600">
      <FaDownload />
    </button>
  );
}

export default DownloadButton;
  