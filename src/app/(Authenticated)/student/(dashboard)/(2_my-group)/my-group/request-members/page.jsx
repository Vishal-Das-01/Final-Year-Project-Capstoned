"use client";

import React, { useState } from "react";
import Image from "next/image";
import styles from "./CurrentProjects.module.css";
import BackButton from "../_components/BackButton/BackButton";
import DropDown from "./_components/DropDown/DropDown";
import { useRouter } from "next/navigation";

function RequestMembers() {
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

  const router = useRouter()

  return (
    <div
      className={`${styles.contentCardTitleContainer} ${styles.container} p-3 overflow-auto my-9 mx-5 flex flex-col rounded-xl font-montserrat`}
    >
      <div className="m-5 flex flex-col space-y-4">
        <div className="flex flex-row justify-start gap-1 items-center">
          <BackButton />
        </div>
        <div className="flex flex-row justify-between items-center">
          <h1 className="text-3xl font-semibold">Request Members</h1>
          <DropDown placeHolder={"Software Engineering"} list={list} />
        </div>
        <div className="flex flex-row justify-between items-center space-x-2">
          <input
            type="text"
            className="w-full h-10 px-3 text-base placeholder-gray-600 border rounded-xl focus:shadow-outline"
            placeholder="Search for members"
          />
          <button
            type="button"
            className="flex flex-row p-1 items-center justify-center h-full font-montserrat font-semibold rounded-lg text-sm tracking-widest text-white bg-black border-4 border-black hover:bg-white hover:border-4 hover:border-black hover:text-black"
          >
            Search
          </button>
        </div>
        <div>
          <div className="flex flex-wrap justify-evenly items-center gap-4">
            {list.map((skill, index) => (
              <button
              onClick={() => {
                router.push('request-members/id')
              }}
                key={index}
                className="w-60 h-72 bg-white shadow-lg rounded-xl p-4 flex flex-col justify-center items-center hover:bg-gray-100"
              >
                <div className="relative h-36 w-36 rounded-full overflow-hidden mb-3 flex justify-center items-center">
                  <Image
                    alt={"Image Cannot be loaded"}
                    src="https://firebasestorage.googleapis.com/v0/b/capstoned-5463f.appspot.com/o/profile_picture%2F65df4b533c513b8b0d83b69d.jpg?alt=media&token=cab7f3cb-a892-4175-a69d-afb8c1e58ff6"
                    fill
                  />
                </div>
                <div className="text-lg font-semibold mt-2">John Doe</div>
                <div className="text-sm">Skill: {skill}</div>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

export default RequestMembers;
