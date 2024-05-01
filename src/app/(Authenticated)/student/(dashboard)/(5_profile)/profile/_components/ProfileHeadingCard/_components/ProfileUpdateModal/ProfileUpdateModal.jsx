import React, { useState } from "react";
import styles from "./ProfileUpdateModal.module.css";
import { AiOutlinePlusCircle } from "react-icons/ai";
import { FaTimes } from "react-icons/fa";
import DropDown from "./_components/DropDown/DropDown";
import TimeTable from "./_components/TimeTable/TimeTable";

function ProfileUpdateModal({ setOpenModal }) {
  const [list, setList] = useState([
    "Software Engineering",
    "Security",
    "Network Security",
    "Cloud Security",
    "Application Security",
    "Machine Learning",
    "Artificial Intelligence",
    "Mobile App Development",
    "Backend Engineering",
  ]);

  const [companyList, setCompanyList] = useState([
    "Google",
    "Facebook",
    "Amazon",
    "Microsoft",
    "Apple",
    "Netflix",
    "Tesla",
    "SpaceX",
    "Twitter",
  ]);

  const tailwindColorClasses = [
    "bg-red-100",
    "bg-blue-100",
    "bg-green-100",
    "bg-yellow-100",
    "bg-indigo-100",
    "bg-purple-100",
    "bg-pink-100",
    "bg-gray-100",
  ];

  const generateRandomColor = () => {
    const randomIndex = Math.floor(Math.random() * tailwindColorClasses.length);
    return tailwindColorClasses[randomIndex];
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
              className=" mb-5 block p-2.5 w-full text-sm text-black bg-gray-50 rounded-lg border border-gray-300"
              placeholder="Introduce yourself to everyone..."
            >
              This is some initial text inside the textarea.
            </textarea>

            <h1 className="font-semibold">Industries Details</h1>
            <hr className={`${styles.line} mb-6`} />

            <div className="flex flex-row mb-3 items-center justify-start">
              <label htmlFor="dropdown" className="text-sm mr-5">
                Interests:
              </label>
              <div>
                <DropDown list={list} placeHolder={"All categories"} />
              </div>
              <button
                disabled
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                <AiOutlinePlusCircle />
              </button>
            </div>

            {list.map((item, index) => {
              const randomColorClass = generateRandomColor();
              return (
                <button
                  key={index}
                  type="button"
                  className={`${randomColorClass} inline-flex justify-center items-center text-sm rounded-xl p-2 mr-2 my-1 `}
                >
                  {item}
                  <FaTimes className="ml-2 text-xs hover:text-red-500" />
                </button>
              );
            })}

            <div className="flex flex-row mb-5 mt-5 items-center justify-start">
              <label htmlFor="dropdown" className="text-sm mr-5">
                Company:
              </label>
              <div>
                <DropDown list={companyList} placeHolder={"All companies"} />
              </div>
              <button
                disabled
                className="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center"
              >
                <AiOutlinePlusCircle />
              </button>
            </div>

            <h1 className="font-semibold ">Office Hours</h1>
            <hr className={`${styles.line} mb-6`} />

            <div className="flex flex-row mb-5 items-center justify-start">
              <label htmlFor="room" className="text-sm block mr-5">
                Room No:
              </label>
              <input className="text-sm border-gray-300 rounded-md p-1.5 border-2 focus:ring-1"></input>
            </div>

            <TimeTable />
          </form>

          <div class="flex items-center justify-end p-4 md:p-5 border-gray-200 rounded-b dark:border-gray-600">
            <button
              data-modal-hide="static-modal"
              type="button"
              className="p-1 text-sm rounded-lg tracking-widest text-white bg-black border-2 border-black hover:text-gray-300"
              onClick={() => setOpenModal(false)}
            >
              Save
            </button>
            <button
              data-modal-hide="static-modal"
              type="button"
              className="p-1 ms-3 rounded-lg text-sm tracking-widest text-black bg-white border-2 border-black hover:bg-gray-300 "
              onClick={() => setOpenModal(false)}
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
