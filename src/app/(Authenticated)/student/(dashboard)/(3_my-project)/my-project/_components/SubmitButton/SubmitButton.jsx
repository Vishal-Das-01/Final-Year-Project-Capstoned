import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { uploadFile } from "@/utils/firebase/uploadFile";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import React, { useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";

function SubmitButton({
  deadlinePassed,
  submitted,
  assignedMilestoneID,
  setReload,
  reload,
  projectID,
}) {
  const [submitting, setSubmitting] = useState(false);
  const [msg, setMsg] = useState("");
  const [files, setFiles] = useState([]);
  const [loading, setLoading] = useState(false);

  const [progress, setProgress] = useState(0);
  const [fileDetails, setFileDetails] = useState([]);

  const fileInputRef = useRef(null);

  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  const handleSave = async () => {
    setLoading(true);
    setMsg("Uploading files...");

    let size = 0;

    for (const file of files) {
      const fileType = file.name.split(".").at(-1).toLowerCase();
      const allowedFileTypes = [
        "pdf",
        "docx",
        "pptx",
        "xlsx",
        "zip",
        "rar",
        "jpg",
        "jpeg",
        "png",
        "txt",
      ];
      if (allowedFileTypes.includes(fileType)) {
        size = size + file.size;
      } else {
        setMsg("Invalid file type");
        setLoading(false);
        return;
      }
    }

    if (size > 25000000) {
      setMsg("File size exceeded");
      setLoading(false);
      return;
    }

    try {
      for (const file of files) {
        const fileType = file.name.split(".").at(-1).toLowerCase();
        const fileURL = await uploadFile(
          file,
          file.name,
          `projects/${projectID}/milestones/${assignedMilestoneID}/`,
          file.type
        );

        fileDetails.push({
          name: file.name,
          doc: fileURL,
          extension: `.${fileType}`,
        });
        setProgress((file.size / size) * 100);
        console.log(progress);
      }

      const accessToken = authDetails.accessToken;
      const response = await callAPI(
        "PATCH",
        accessToken,
        `${BACKEND_ROUTES.studentSubmitMilestone}${assignedMilestoneID}`,
        {
          submissionFile: fileDetails,
        }
      );
      if (response.status === HttpStatusCode.Ok) {
        setReload(!reload);
      } else if (response.status === HttpStatusCode.Unauthorized) {
        dispatch(removeAuthDetails());
        router.push(FRONTEND_ROUTES.login_page);
      } else if (response.status === HttpStatusCode.BadRequest) {
        const responseData = await response.json();
        setMsg(responseData.message);
        setLoading(false);
      }
    } catch (error) {
      setMsg("Error uploading files");
      setLoading(false);
    }
  };

  const handleCancel = () => {
    setSubmitting(false);
    setMsg("");
  };

  return (
    <div className="flex flex-row col-span-4 items-center justify-end">
      <input
        type="file"
        className="hidden"
        ref={fileInputRef}
        multiple
        onChange={(e) => setFiles(Array.from(e.target.files))}
      />
      {submitting ? (
        <div className="flex flex-col">
          <div className="flex flex-row w-full items-center justify-end space-x-5 mb-3">
            {files.map((file, index) => (
              <p key={index} className="text-xs">
                {file.name}
              </p>
            ))}
            <button
              disabled={loading}
              onClick={handleSave}
              className="h-10 bg-green-500 border-2 border-green-500 text-white rounded-full px-2.5 py-1.5 text-sm bg-"
            >
              Save
            </button>
            <button
              disabled={loading}
              onClick={handleCancel}
              className="h-10 text-black border-2 border-black rounded-full px-2.5 py-1.5 text-sm bg-"
            >
              Cancel
            </button>
          </div>
          <div className="w-full flex flex-row items-center justify-end space-x-5">
            <p>{msg}</p>
            <div class="w-60 bg-gray-200 rounded-full h-2.5 dark:bg-gray-700">
              <div
                class="bg-blue-600 h-2.5 rounded-full"
                style={{ width: `${progress}%` }}
              />
            </div>
          </div>
        </div>
      ) : (
        <button
          onClick={() => {
            setSubmitting(true);
            fileInputRef.current.click();
          }}
          disabled={deadlinePassed || submitted}
          className={`h-10 ${
            deadlinePassed || submitted
              ? "bg-gray-500"
              : "bg-green-500 hover:bg-green-700"
          } text-white rounded-full px-2.5 py-1.5 text-sm disabled:opacity-50 disabled:cursor-not-allowed disabled:click-events-none`}
        >
          Submit Files
        </button>
      )}
    </div>
  );
}

export default SubmitButton;
