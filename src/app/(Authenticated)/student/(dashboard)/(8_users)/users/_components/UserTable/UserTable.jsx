import React from "react";
import styles from "./UserTable.module.css";
import { PaginationComponent } from "./_components/PaginationComponent/PaginationComponent";
import Loader from "./_components/Loader/Loader";
import StudentRow from "./_components/StudentRow/StudentRow";
import MentorRow from "./_components/MentorRow/MentorRow";

function UserTable({
  userType,
  page,
  totalPages,
  setPageNumber,
  loading,
  users,
}) {
  return (
    <div className="relative m-5 overflow-hidden bg-white border-2 shadow-lg dark:bg-gray-800 rounded-xl">
      <div className={`overflow-y-auto ${styles.container}`}>
        <table className="w-full text-sm text-left text-gray-500 table-auto">
          <thead className="sticky top-0 z-10 text-xs text-center text-white uppercase bg-blue-500 ">
            <tr>
              <th scope="col" class="px-4 py-3 w-1/12">
                <span className="sr-only">Actions</span>
              </th>
              <th scope="col" class="px-4 py-3 w-1/12">
                <span className="sr-only">Actions</span>
              </th>
              <th scope="col" class="px-4 py-3 text-left w-4/12">
                Name
              </th>
              <th scope="col" class="px-4 py-3 text-left w-1/12">
                Gender
              </th>
              <th scope="col" class="px-4 py-3 w-1/12">
                {userType === "Students" ? "ERP" : "Role"}
              </th>
              <th scope="col" class="px-4 py-3 w-1/12">
                {userType === "Students" ? "GPA" : "Groups"}
              </th>
              <th scope="col" class="px-4 py-3 w-2/12">
                {userType === "Students" ? "Group" : "Company Name"}
              </th>
              <th scope="col" class="px-4 py-3 w-1/12">
                {userType === "Students" ? "Resume" : "Supervisor"}
              </th>
            </tr>
          </thead>
          <div className="font-semibold absolute w-full bottom-0 z-10 text-xs text-white bg-blue-500 flex flex-row items-center justify-end pr-1.5 pb-1.5">
            <PaginationComponent
              totalPages={totalPages}
              page={page}
              setPageNumber={setPageNumber}
            />
          </div>
          <tbody>
            {loading && (
              <tr>
                <td colSpan={8}>
                  <Loader />
                </td>
              </tr>
            )}
            {!loading &&
              users.length !== 0 &&
              userType === "Students" &&
              users.map((user, index) => (
                <StudentRow
                  key={index}
                  profileImage={user.profileImage}
                  name={user.firstName + " " + user.lastName}
                  gender={user.gender}
                  erp={user.studentID}
                  gpa={user.gpa}
                  resume={user.resume}
                  industries={user.industriesOfInterest}
                  group={user.group}
                />
              ))}
              {!loading &&
              users.length !== 0 &&
              (userType === "Mentors" || userType === "Supervisors") &&
              users.map((user, index) => (
                <MentorRow
                  key={index}
                  profileImage={user.profileImage}
                  name={user.firstName + " " + user.lastName}
                  gender={user.gender}
                  role={user.isUniversityTeacher?"Teacher":"Industry"}
                  numOfGroups={user.groups?.length}
                  company={user.company}
                  industries={user.industries}
                  supervisor={user.canSupervise}
                />
              ))}
              <div className="h-10"></div>
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default UserTable;
