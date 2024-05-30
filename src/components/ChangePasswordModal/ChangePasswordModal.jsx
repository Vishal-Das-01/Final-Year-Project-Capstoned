import React, { useState } from "react";
import styles from "./ChangePasswordModal.module.css";
import { FaTimes } from "react-icons/fa";
import { callAPI } from "@/utils/helpers/callAPI";
import { useDispatch, useSelector } from "react-redux";
import { HttpStatusCode } from "axios";
import { useRouter } from "next/navigation";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { uploadFile } from "@/utils/firebase/uploadFile";
import { DocFileType } from "@/utils/constants/enums";

function ChangePasswordModal({setOpenModal}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  const [loading, setLoading] = useState(false);
  const [prompt, setPrompt] = useState(false);
  const [error, setError] = useState(false);
  const [msg, setMsg] = useState("");

  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  const changePassword = async () => {
    try {

    } catch(e) {
        
    }
  }

//   const addProposal = async () => {
//     console.log(title, description, mentorship, list, proposalDoc);
//     setPrompt(true);
//     if (
//       title === "" ||
//       description === "" ||
//       list.length === 0 ||
//       !proposalDoc ||
//       proposalDoc.size > 5000000
//     ) {
//       if (proposalDoc.size > 5000000) {
//         setMsg("File size should be less than 5MB.");
//         setError(true);
//       } else if (proposalDoc.type !== "application/pdf") {
//         setMsg("File should be in PDF format only.");
//         setError(true);
//       } else {
//         setError(true);
//         setMsg("Please, enter all details.");
//       }
//       return;
//     } else {
//       setLoading(true);
//       setError(false);
//       setMsg("Adding proposal...");

//       const accessToken = authDetails.accessToken;
//       const response = await callAPI(
//         "POST",
//         accessToken,
//         BACKEND_ROUTES.createProposalMentor,
//         {
//           title: title,
//           description: description,
//           industries: list,
//           mentorship: mentorship,
//         }
//       );
//       if (response.status === HttpStatusCode.Ok) {
//         const responseData = await response.json();
//         const fileURL = await uploadFile(
//           proposalDoc,
//           responseData.proposalID,
//           "proposals/mentor/",
//           proposalDoc.type
//         );
//         const linkUpdateResponse = await callAPI(
//           "PATCH",
//           accessToken,
//           BACKEND_ROUTES.updateProposalLinkMentor,
//           {
//             proposalID: responseData.proposalID,
//             link: {
//               file: fileURL,
//               extension: DocFileType.PDF,
//             },
//           }
//         );
//         if (linkUpdateResponse.status === HttpStatusCode.Ok) {
//           setLoading(false);
//           setOpenModal(false);
//           router.refresh();
//         }
//       } else if (response.status === HttpStatusCode.Unauthorized) {
//         setLoading(false);
//         setPrompt(false);
//         setError(false);
//         setMsg("");
//         const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
//           method: "POST",
//         });
//         if (responseLogOut.status === HttpStatusCode.Ok) {
//           dispatch(removeAuthDetails());
//           router.replace(FRONTEND_ROUTES.landing_page);
//         }
//       } else if (response.status === HttpStatusCode.BadRequest) {
//         setLoading(false);
//         setError(true);
//         setPrompt(true);
//         setMsg("You have reached the maximum number of proposals");
//       }
//     }
//   };

  return (
    <div id="static-modal" data-modal-backdrop="static" tabindex="-1" aria-hidden="true"
      class="backdrop-blur-md flex h-screen bg-gray-500 bg-opacity-50 items-center justify-center overflow-x-hidden fixed z-50 w-full md:inset-0 max-h-full overflow-y-auto"
    >
      <div class="p-4 w-full max-w-4xl max-h-full">
        <div class="bg-white shadow">
          <div class="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
            <h3 class="font-semibold text-base text-black">
              Change Password
            </h3>

            <button
              disabled={loading}
              type="button"
              class="text-black bg-transparent hover:bg-red-500 hover:text-white rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center"
              data-modal-hide="static-modal"
              onClick={() => setOpenModal(false)}
            >
              <svg
                class="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <form className={`${styles.form} py-5 px-10  overflow-auto`}>
            <div className="flex flex-row mb-8 items-center justify-start">
                <label htmlFor="newPassword" className="text-sm block mr-5 text-black">
                    New Password:
                </label>
                <input
                    value={newPassword}
                    placeholder="Enter your new password"
                    onChange={(e) => setNewPassword(e.target.value)}
                    id="newPassword"
                    type="password"
                    name="newPassword"
                    className="text-sm w-1/2 border-gray-300 text-black rounded-md p-1.5 border-2 focus:ring-1 mr-3 focus:ring-blue-500"
                    maxLength="50"
                />
                <p className="text-xs">{newPassword.length}/50</p>
            </div>

            <div className="flex flex-row mb-8 items-center justify-start">
                <label htmlFor="confirmedPassword" className="text-sm block mr-5 text-black">
                    Confirmed Password:
                </label>
                <input
                    value={confirmedPassword}
                    placeholder="Confirm your new password"
                    onChange={(e) => setConfirmedPassword(e.target.value)}
                    id="confirmedPassword"
                    type="password"
                    name="confirmedPassword"
                    className="text-sm w-1/2 border-gray-300 text-black rounded-md p-1.5 border-2 focus:ring-1 mr-3 focus:ring-blue-500"
                    maxLength="50"
                />
                <p className="text-xs">{confirmedPassword.length}/50</p>
            </div>
          </form>

          <div class="flex items-center justify-end p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600">
            {prompt && (
              <p
                className={`${error ? "text-red-500" : "text-green-500"} mr-5`}
              >
                {msg}
              </p>
            )}
            <button
              disabled={loading}
              data-modal-hide="static-modal"
              type="button"
              className="p-1 text-sm rounded-lg tracking-widest text-white bg-black border-2 border-black hover:text-gray-300"
              onClick={() => addProposal()}
            >
              Save
            </button>
            <button
              data-modal-hide="static-modal"
              type="button"
              className="p-1 ms-3 rounded-lg text-sm tracking-widest text-black bg-white border-2 border-black hover:bg-gray-300 "
              onClick={() => setOpenModal(false)}
              disabled={loading}
            >
              Cancel
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ChangePasswordModal;