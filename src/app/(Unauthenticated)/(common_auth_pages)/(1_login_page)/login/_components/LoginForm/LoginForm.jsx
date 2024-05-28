"use client";
import { useState } from "react";
import ForgotPasswordLink from "../ForgotPasswordLink/ForgotPasswordLink";
import TextInput from "@/app/(Unauthenticated)/(common_auth_pages)/_components/TextInput/TextInput";
import SubmitBtn from "@/app/(Unauthenticated)/(common_auth_pages)/_components/SubmitBtn/SubmitBtn";
import LoadingBtn from "@/app/(Unauthenticated)/(common_auth_pages)/_components/LoadingBtn/LoadingBtn";
import {
  FRONTEND_ROUTES,
  FRONTEND_ROUTES_MENTOR,
} from "@/utils/routes/frontend_routes";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import { useDispatch } from "react-redux";
import { setAuthDetails } from "@/provider/redux/features/AuthDetails";
import { jwtDecode } from "jwt-decode";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";
import { HttpStatusCode } from "axios";

export default function LoginForm() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (email === "" || password === "") {
        setErrorMsg("Please fill all the fields");
        return;
      }
      setIsPending(true);
      const response = await fetch(BACKEND_ROUTES.login, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email: email,
          password: password,
        }),
      })
      const responseData = await response.json();
      if (response.status === HttpStatusCode.Ok) {
        const { role, email, profileID } = jwtDecode(responseData.accessToken);
        dispatch(
          setAuthDetails({
            role: role,
            email: email,
            profileID: profileID,
            accessToken: responseData.accessToken,
            profileImage: responseData.user.profileID.profileImage?.image,
            firstName: responseData.user.profileID.firstName,
            lastName: responseData.user.profileID.lastName,
            gender: responseData.user.profileID.gender
          })
        );
        if (role === "Admin") {
          router.replace(FRONTEND_ROUTES.admin_dashboard_home_page);
        } else if (role === "Mentor") {
          router.replace(FRONTEND_ROUTES_MENTOR.mentor_dashboard_home_page);
        } else {
          router.replace(FRONTEND_ROUTES.student_dashboard_home_page);
        }
      }
      else{
        setErrorMsg(responseData.message);
        setIsPending(false);
      }
    } catch (error) {
      alert(error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-center justify-center mt-3"
    >
      <TextInput
        label="Email"
        inputType="email"
        inputPlaceholder="Email"
        value={email}
        setValue={setEmail}
      />

      <TextInput
        label="Password"
        inputType="password"
        inputPlaceholder="Password"
        value={password}
        setValue={setPassword}
      />

      <ForgotPasswordLink href={FRONTEND_ROUTES.forgot_password_page} />

      {isPending ? <LoadingBtn /> : <SubmitBtn btnText="Login" />}

      <div
        className={`${styles.errorMsgContainer} w-full flex items-center justify-center h-8`}
      >
        <p className={`font-montserrat font-base text-red-600 text-lg`}>
          {errorMsg}
        </p>
      </div>
    </form>
  );
}
