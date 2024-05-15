import React from "react";
import styles from "./FinalYearGroups.module.css";
import ListTile from "./_components/ListTile/ListTile";
import { cookies } from "next/headers";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { redirect } from "next/navigation";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import NotFound from "../_components/NotFound/NotFound";

export const metadata = {
  title: "Final Year Groups",
  description:
    "Capstoned Mentor Groups | Final Year Project (FYP) Management Platform for College & University Students.",
};

async function FinalYearGroups() {
  const groups = await getGroups();

  return (
    <div className={`${styles.container} m-4 overflow-y-auto`}>
      {groups.length === 0 && <NotFound />}
      {groups.map((item, index) => (
        <ListTile key={index} id={item._id} details={item.details} role={item.role} />
      ))}
    </div>
  );
}

export default FinalYearGroups;

async function getGroups() {
  const accessToken = cookies().get("accessToken")?.value;
  const response = await callAPI(
    "GET",
    accessToken,
    BACKEND_ROUTES.getMentorGroups
  );
  if (response.status === HttpStatusCode.Ok) {
    const responseData = await response.json();
    return responseData.data;
  } else if (response.status === HttpStatusCode.Unauthorized) {
    redirect(FRONTEND_ROUTES.login_page);
  }
}
