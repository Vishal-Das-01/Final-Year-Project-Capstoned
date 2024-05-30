import { getFile } from "@/utils/firebase/getFile";
import React from "react";
import toast from "react-hot-toast";
import { FaDownload } from "react-icons/fa";

function DownloadButton({ fileName, fileUrl }) {
  const handleDownload = async () => {
    if (!fileUrl) {
      toast.error("Resume not found");
    } else {
      await getFile(fileUrl, fileName, "application/pdf");
    }
  };

  return (
    <button onClick={handleDownload} className="text-black hover:text-blue-600">
      <FaDownload />
    </button>
  );
}

export default DownloadButton;
