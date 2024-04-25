import React from "react";
import BackButton from "./_components/BackButton/BackButton";
import { IoIosArrowDown } from "react-icons/io";

function ProjectPage() {
  return (
    <div className="m-5 flex flex-col space-y-7">
      <BackButton />
      <div className="flex flex-row justify-between items-center">
        <h1 className="text-3xl font-semibold">
          Project Name - IBA Computer Group
        </h1>
        <h2 className="font-light">Fall 2024</h2>
      </div>
      <h2>
        <span className="font-semibold">Your Role:</span> Supervisor/Mentor
      </h2>
      <h2>
        <span className="font-semibold">Proposed By:</span> Dr. Imran Khan
      </h2>
      <div className="grid grid-cols-2">
        <p>
          <span className="font-semibold">Progress:</span> 30%
        </p>
        <p>
          <span className="font-semibold">Grade:</span> Ungraded
        </p>
      </div>
      <p>
        <span className="font-semibold">Project Description:</span> Lorem ipsum
        dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor
        incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam,
        quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo
        consequat. Duis aute irure dolor in reprehenderit in voluptate velit
        esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat
        cupidatat non proident, sunt in culpa qui officia deserunt mollit anim
        id est laborum.
      </p>
      <div className="flex flex-col">
        <p className="font-semibold">Group Members:</p>
        <ul className="list-disc ml-10">
          <li>Taha Mirza</li>
          <li>Owais Ali</li>
          <li>Hamza Akbar</li>
        </ul>
      </div>
      <div className="hover:bg-gray-100 border-2 rounded-full border-blue-500 h-16 flex flex-row items-center justify-between px-10 font-bold text-base">
        <h1>Milestone 1</h1>
        <IoIosArrowDown/>
      </div>
      <div className="border-2 rounded-full border-blue-500 h-16 flex flex-row items-center px-10 font-bold text-base">Milestone 2</div>
      <div className="border-2 rounded-full border-blue-500 h-16 flex flex-row items-center px-10 font-bold text-base">Milestone 3</div>
    </div>
  );
}

export default ProjectPage;
