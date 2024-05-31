import React, { useState } from "react";
import styles from "./ChangePasswordModal.module.css";
import { callAPI } from "@/utils/helpers/callAPI";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { FRONTEND_ROUTES, FRONTEND_ROUTES_MENTOR } from "@/utils/routes/frontend_routes";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import toast from "react-hot-toast";
import { Role } from "@/utils/constants/enums";

function ChangePasswordModal({setOpenModal}) {
  const [newPassword, setNewPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");
  const [loading, setLoading] = useState(false);

  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  const changePassword = async () => {
    try {
        setLoading(true);

        if(newPassword === "") {
            toast.error('Please enter password.', {position: 'top-right'})
            return;
        }
        else if(confirmedPassword === "") {
            toast.error('Please confirm your password.', {position: 'top-right'})
            return;
        }
        else if(newPassword !== confirmedPassword) {
            toast.error('Passwords do not match.', {position: 'top-right'})
            return;
        }

        const loadingToast = toast.loading('Changing password...', { position: 'top-right' });

        const response = await callAPI("PATCH", authDetails.accessToken, BACKEND_ROUTES.newPassword, { newPassword });

        const responseData = await response.json()

        if (response.status === 200) {
          toast.success(responseData.message, { id: loadingToast, position: 'top-right' });

          if (authDetails.role === Role.Admin) {
            router.replace(FRONTEND_ROUTES.admin_dashboard_home_page);
          } else if (authDetails.role === Role.Mentor) {
            router.replace(FRONTEND_ROUTES_MENTOR.mentor_dashboard_home_page);
          } else {
            router.replace(FRONTEND_ROUTES.student_dashboard_home_page);
          }
        }
        else if(response.status === 403) {
          toast.error(responseData.message, { id: loadingToast, position: 'top-right' });

          const responseLogOut = await fetch(BACKEND_ROUTES.logout, {method: "POST",});

          if(responseLogOut.status === 200) {
            dispatch(removeAuthDetails());
            router.replace(FRONTEND_ROUTES.login_page);
          }
        }
        else {
          toast.error(responseData.message, { id: loadingToast, position: 'top-right' });
        }
    } catch(error) {
        toast.error("Unexpected error. Unable to change password.");
    } finally {
      setLoading(false)
    }
  }

  return (
    <div id="static-modal" data-modal-backdrop="static" tabIndex="-1" aria-hidden="true"
      className="backdrop-blur-md flex h-screen bg-gray-500 bg-opacity-50 items-center justify-center overflow-x-hidden fixed z-50 w-full md:inset-0 max-h-full overflow-y-auto"
    >
      <div className="p-4 w-full max-w-4xl max-h-full">
        <div className="bg-white shadow">
          <div className="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
            <h3 className="font-semibold text-base text-black">
              Change Password
            </h3>

            <button
              disabled={loading}
              type="button"
              className="text-black bg-transparent hover:bg-red-500 hover:text-white rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center"
              data-modal-hide="static-modal"
              onClick={() => setOpenModal(false)}
            >
              <svg
                className="w-3 h-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 14"
              >
                <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                />
              </svg>
            </button>
          </div>

          <div className={`${styles.form} py-5 px-10  overflow-auto`}>
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
          </div>

          <div className="flex items-center justify-end p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600">
            <button
              disabled={loading}
              data-modal-hide="static-modal"
              type="button"
              className="p-1 text-sm rounded-lg tracking-widest text-white bg-black border-2 border-black hover:text-gray-300"
              onClick={() => changePassword()}
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