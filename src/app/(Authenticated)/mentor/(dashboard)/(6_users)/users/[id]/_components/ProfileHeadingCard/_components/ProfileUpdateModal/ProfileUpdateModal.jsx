import React, { useEffect, useState } from "react";
import styles from "./ProfileUpdateModal.module.css";
import DropDown from "./_components/DropDown/DropDown";
import TimeTable from "./_components/TimeTable/TimeTable";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { callAPI } from "@/utils/helpers/callAPI";
import { useDispatch, useSelector } from "react-redux";
import { useRouter } from "next/navigation";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";
import DropDownIndustries from "./_components/DropDownIndustries/DropDownIndustries";
import { FaTimes } from "react-icons/fa";
import { set } from "mongoose";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";

function ProfileUpdateModal({
  setOpenModal,
  bio,
  company,
  industries,
  oldRoomNum,
  oldOfficeHours,
  oldOccupation
}) {
  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();
  const router = useRouter();

  const [description, setDescription] = useState(bio || "");
  const [list, setList] = useState(industries);
  const [roomNum, setRoomNum] = useState(oldRoomNum);
  const [officeHours, setOfficeHours] = useState(oldOfficeHours);
  const [selectedCompany, setSelectedCompany] = useState(company);
  const [occupation, setOccupation] = useState(oldOccupation);

  const [companyList, setCompanyList] = useState([]);

  const [loading,setLoading] = useState(false)

  const handleAdd = (value) => {
    if (value === "All Categories") return;
    if (!list.includes(value)) {
      setList([...list, value]);
    }
  };

  const handleDelete = (indexToRemove) => {
    const updatedList = list.filter((_, index) => index !== indexToRemove);
    setList(updatedList);
  };

  useEffect(() => {
    async function fetchCompanies() {
      const accessToken = authDetails.accessToken;
      let allCompanies = [];
      let currentPage = 1;

      while (true) {
        const response = await callAPI(
          "GET",
          accessToken,
          `${BACKEND_ROUTES.getAllCompanies}?page=${currentPage}&limit=5`
        );
        if (response.status === HttpStatusCode.Unauthorized) {
          const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
            method: "POST",
          });
          if (responseLogOut.status === HttpStatusCode.Ok) {
            dispatch(removeAuthDetails());
            router.replace(FRONTEND_ROUTES.landing_page);
          }
        }
        if (response.status === HttpStatusCode.Ok) {
          {
            const { data } = await response.json();
            const { companies, totalPages } = data;

            allCompanies = [...allCompanies, ...companies];
            currentPage++;

            if (currentPage > totalPages) {
              break;
            }
          }
        }
      }
      setCompanyList(allCompanies);
    }

    fetchCompanies();
  }, [authDetails.accessToken, dispatch, router]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    const accessToken = authDetails.accessToken;
    console.log(description, list, roomNum, officeHours, selectedCompany, occupation);

    setLoading(true)
    const response = await callAPI('PATCH', accessToken, BACKEND_ROUTES.updateProfileMentor, 
    {
      officeHours: officeHours,
      industries: list,
      roomNum: roomNum,
      company: selectedCompany,
      occupation: occupation,
      bio: description
    }) 
    console.log(response)
    if(response.status === HttpStatusCode.Ok){
      setLoading(false)
      setOpenModal(false)
      router.refresh();
    }
    if(response.status === HttpStatusCode.Unauthorized){
      const responseLogOut = await fetch(BACKEND_ROUTES.logout, {
        method: "POST",
      });
      if (responseLogOut.status === HttpStatusCode.Ok) {
        dispatch(removeAuthDetails());
        router.replace(FRONTEND_ROUTES.landing_page);
      }
    }

  };
  return (
    <div
      id="static-modal"
      data-modal-backdrop="static"
      tabindex="-1"
      aria-hidden="true"
      class="backdrop-blur-md flex h-screen bg-gray-500 bg-opacity-50 items-center justify-center overflow-x-hidden fixed z-50 w-full md:inset-0 max-h-full overflow-y-auto"
    >
      <div class="p-4 w-full max-w-3xl max-h-full">
        <div class="bg-white shadow">
          <div class="flex items-center justify-between p-4 md:p-5 rounded-t dark:border-gray-600">
            <h3 class="font-semibold">Update Your Profile</h3>

            <button
              type="button"
              class="text-black bg-transparent hover:bg-red-500 hover:text-white rounded-lg text-sm w-6 h-6 ms-auto inline-flex justify-center items-center"
              data-modal-hide="static-modal"
              disabled={loading}
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
              <span class="sr-only">Update Your Profile</span>
            </button>
          </div>

          <form className={`${styles.form} py-5 px-10  overflow-auto`}>
            <h1 className="font-semibold">Introduce yourself</h1>
            <hr className={`${styles.line} mb-6`} />
            <textarea
              id="bio"
              rows="2"
              className="mb-1 block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Introduce yourself to everyone..."
              value={description}
              maxLength={200}
              onChange={(e) => setDescription(e.target.value)}
            />
            <p className="text-xs w-full flex flex-row justify-end mb-5">
              {description.length}/200
            </p>

            <h1 className="font-semibold">Industries Details</h1>
            <hr className={`${styles.line} mb-6`} />

            <div className="flex flex-row items-center justify-start mb-3">
              <label htmlFor="dropdown" className="text-sm mr-5 text-black">
                Interests:
              </label>
              <DropDownIndustries
                list={list}
                handleAdd={handleAdd}
                placeHolder={"All categories"}
              />
            </div>

            <div className="border-2 border-gray-300 rounded-lg p-2">
              {list.map((item, index) => (
                <button
                  key={index}
                  type="button"
                  className="bg-blue-100 inline-flex justify-center items-center text-sm rounded-xl p-2 mr-2 my-1"
                >
                  {item}
                  <FaTimes
                    className="ml-2 text-xs hover:text-red-500"
                    onClick={() => handleDelete(index)}
                  />
                </button>
              ))}
            </div>

            <div className="flex flex-row mb-5 mt-5 items-center justify-start">
              <label htmlFor="dropdown" className="text-sm mr-5">
                Company:
              </label>
              <div>
                <DropDown
                  list={companyList.map((company) => ({
                    label: company.name,
                    value: company._id,
                  }))}
                  placeHolder={"Select Company"}
                  setSelectedCompany={setSelectedCompany}
                />
              </div>
            </div>

            <div className="flex flex-row mb-5 items-center justify-start">
              <label htmlFor="room" className="text-sm block mr-5">
                Occupation:
              </label>
              <input
                className="text-sm border-gray-300 rounded-md p-1.5 border-2 focus:ring-1"
                onChange={(e) => setOccupation(e.target.value)}
                value={occupation}
                maxLength={30}
              />
            </div>

            <h1 className="font-semibold ">Office Hours</h1>
            <hr className={`${styles.line} mb-6`} />

            <div className="flex flex-row mb-5 items-center justify-start">
              <label htmlFor="room" className="text-sm block mr-5">
                Room No:
              </label>
              <input
                className="text-sm border-gray-300 rounded-md p-1.5 border-2 focus:ring-1"
                onChange={(e) => setRoomNum(e.target.value)}
                value={roomNum}
                maxLength={7}
              />
            </div>

            <TimeTable oldOfficeHours={oldOfficeHours} setOfficeHours={setOfficeHours}/>
          </form>

          <div class="flex items-center justify-end p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="static-modal"
              type="button"
              className="p-1 text-sm rounded-lg tracking-widest text-white bg-black border-2 border-black hover:text-gray-300"
              onClick={handleSubmit}
              disabled={loading}
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

export default ProfileUpdateModal;
