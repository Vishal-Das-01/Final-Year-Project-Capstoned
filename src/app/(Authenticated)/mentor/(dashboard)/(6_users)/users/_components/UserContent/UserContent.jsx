"use client";
import React, { useEffect, useState } from "react";
import SearchBar from "../SearchBar/SearchBar";
import UserTable from "../UserTable/UserTable";
import RadioButtons from "../RadioButtons/RadioButtons";
import { useRouter } from "next/navigation";
import { useDispatch, useSelector } from "react-redux";
import { callAPI } from "@/utils/helpers/callAPI";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { HttpStatusCode } from "axios";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { removeAuthDetails } from "@/provider/redux/features/AuthDetails";

function UserContent() {
  const [pageNumber, setPageNumber] = useState(1);
  const [totalPages, setTotalPages] = useState(10);

  const [radioUserType, setRadioUserType] = useState("Students");

  const [userType, setUserType] = useState("Students");
  const [search, setSearch] = useState("");

  const [loading, setLoading] = useState(true);

  const [users, setUsers] = useState([]);

  const router = useRouter();
  const authDetails = useSelector((state) => state.AuthDetails);
  const dispatch = useDispatch();

  useEffect(() => {
    const accessToken = authDetails.accessToken;

    const getUsers = async () => {
      setLoading(true);

      if (userType === "Students") {
        const response = await callAPI(
          "GET",
          accessToken,
          `${BACKEND_ROUTES.getSearchAllStudents}?page=${pageNumber}&search=${search}`
        );
        if (response.status === HttpStatusCode.Ok) {
          const responseData = await response.json();
          setTotalPages(responseData.data.totalPages);
          setUsers(responseData.data.students);
        } else if (response.status === HttpStatusCode.Unauthorized) {
          dispatch(removeAuthDetails());
          router.push(FRONTEND_ROUTES.login);
        }
      } else if (userType === "Mentors") {
        const response = await callAPI(
          "GET",
          accessToken,
          `${BACKEND_ROUTES.getSearchAllMentors}?page=${pageNumber}&search=${search}`
        );
        if (response.status === HttpStatusCode.Ok) {
          const responseData = await response.json();
          setTotalPages(responseData.data.totalPages);
          setUsers(responseData.data.mentors);
        } else if (response.status === HttpStatusCode.Unauthorized) {
          dispatch(removeAuthDetails());
          router.push(FRONTEND_ROUTES.login);
        }
      } else {
        const response = await callAPI(
          "GET",
          accessToken,
          `${BACKEND_ROUTES.getSearchAllMentors}?page=${pageNumber}&search=${search}&supervisor=true`
        );
        if (response.status === HttpStatusCode.Ok) {
          const responseData = await response.json();
          setTotalPages(responseData.data.totalPages);
          setUsers(responseData.data.mentors);
        } else if (response.status === HttpStatusCode.Unauthorized) {
          dispatch(removeAuthDetails());
          router.push(FRONTEND_ROUTES.login);
        }
      }
      setLoading(false);
    };

    getUsers();

  }, [pageNumber, search, userType]);

  return (
    <div className="flex flex-col">
      <div className="flex flex-row items-center justify-start gap-10">
        <SearchBar
          setSearch={setSearch}
          setUserType={setUserType}
          radioUserType={radioUserType}
          setPageNumber={setPageNumber}
        />
        <RadioButtons setRadioUserType={setRadioUserType} />
      </div>
      <UserTable
        userType={userType}
        page={pageNumber}
        totalPages={totalPages}
        setPageNumber={setPageNumber}
        loading={loading}
        users={users}
      />
    </div>
  );
}

export default UserContent;
