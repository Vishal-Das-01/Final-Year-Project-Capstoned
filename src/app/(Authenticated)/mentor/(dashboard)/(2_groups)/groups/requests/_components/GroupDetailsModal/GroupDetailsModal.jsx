import React, { useEffect, useState } from "react";
import ResourceButton from "./_components/ResourceButton/ResourceButton";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { HttpStatusCode } from "axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { callAPI } from "@/utils/helpers/callAPI";

function GroupDetailsModal({ setOpenModal, groupID }) {

  const [groupDetails, setGroupDetails] = useState(null);

  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  useEffect(() => {

    const getGroupDetails = async () => {
      const accessToken = authDetails.accessToken;
      const response = await callAPI("GET", accessToken, `${BACKEND_ROUTES.getGroupDetails}?id=${groupID}`);
      if (response.status === HttpStatusCode.Ok) {
        const responseData = await response.json();
        console.log(responseData);
        setGroupDetails(responseData.data);
      } else if (response.status === HttpStatusCode.Unauthorized) {
        const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
          method: "POST",
        });
        if (responseLogOut.status === HttpStatusCode.Ok) {
          dispatch(removeAuthDetails());
          router.replace(FRONTEND_ROUTES.landing_page);
        }
      }
    }

    getGroupDetails();

  }, [authDetails.accessToken, dispatch, router, groupID]);

  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      class="backdrop-blur-md flex h-screen bg-gray-500 bg-opacity-50 items-center justify-center overflow-x-hidden fixed z-50 w-full md:inset-0 max-h-full overflow-y-auto"
    >
      <div class="p-4 w-full max-w-xl max-h-full">
        <div class="bg-white shadow">
          <div class="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
            <h3 class="font-semibold text-base text-black">Group Details</h3>

            <button
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

          <div className="grid grid-cols-3 pb-10 pt-5 px-10 gap-4 text-base font-montserrat">
            <h className="font-medium">Members:</h>
            <div className="flex flex-col col-span-2 justify-items-start">
              <p>Taha Mirza</p>
              <p>Syed Owais Ali</p>
              <p>Hamza Akbar</p>
            </div>
            <h className="font-medium">Supervisor:</h>
            <p className="col-span-2">Dr. Saeed</p>
            <h className="font-medium">Mentor:</h>
            <div className=" flex flex-col col-span-2">
              <p>Tahir Syed</p>
              <p>Sami ul Ahbab</p>
            </div>
            <h className="font-medium">Selected Proposals:</h>
            <div className="flex flex-wrap col-span-2 gap-y-2">
              <ResourceButton name="Proposal 1" />
              <ResourceButton name="Pr" />
              <ResourceButton name="Pr 3" />
              <ResourceButton name="Prssssssssssssopos 1" />
              <ResourceButton name="Proposal 2" />
              <ResourceButton name="Proposal 3" />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default GroupDetailsModal;
