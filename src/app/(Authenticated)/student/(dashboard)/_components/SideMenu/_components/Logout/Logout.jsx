"use client";
import { api } from "@/utils/helpers/axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import React from "react";
import { MdLogout } from "react-icons/md";
import { useRouter } from "next/navigation";
import styles from "./Logout.module.css";
import { useDispatch } from "react-redux";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";

function Logout() {
  const router = useRouter();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    try {
      const response = await fetch(BACKEND_ROUTES.logout, { method: "POST" });
      if (response.status === 200) {
        dispatch(removeAuthDetails());
        router.replace(FRONTEND_ROUTES.landing_page);
      }
    } catch (error) {
      console.log(error);
    }
  };
  return (
    <button
      onClick={handleLogout}
      className={`${styles.boxWidth} w-full font-montserrat flex flex-row items-center font-semibold text-gray-500 tracking-wide hover:opacity-75`}
    >
      <div className="w-1/4 flex flex-row justify-center">
        <MdLogout className={`${styles.icon}`} />
      </div>

      <p className="w-3/4 items-start flex flex-row">Logout</p>
    </button>
  );
}

export default Logout;
