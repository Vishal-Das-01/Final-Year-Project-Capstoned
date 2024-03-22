"use client";
import { useState } from "react";
import ForgetPasswordLink from "../ForgetPasswordLink/ForgetPasswordLink";
import LoginInput from "../LoginInput/LoginInput";
import LoginSubmitBtn from "../LoginSubmitBtn/LoginSubmitBtn";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { api } from "@/utils/helpers/axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import LoginLoadingBtn from "../LoginLoadingBtn/LoginLoadingBtn";
import { useDispatch } from "react-redux";
import { setAuthDetails } from "@/provider/redux/features/AuthDetails";
import { jwtDecode } from "jwt-decode";
import styles from "./LoginForm.module.css";
import { useRouter } from "next/navigation";


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
      const response = await api.post(BACKEND_ROUTES.login, {
        email: email,
        password: password,
      });
      console.log(response);
      if (response.status === 200) {
        const { role, email, profileID } = jwtDecode(response.data.accessToken);
        dispatch(
          setAuthDetails({
            accessToken: response.data.accessToken,
            role: role,
            email: email,
            profileID: profileID,
          })
        );
        if (role === "Admin") {
            router.replace(FRONTEND_ROUTES.admin_dashboard_home_page,);
        } else if (role === "Mentor") {
            router.replace(FRONTEND_ROUTES.mentor_dashboard_home_page);
        } else {
            router.replace(FRONTEND_ROUTES.student_dashboard_home_page);
        }
      }
    } catch (error) {
        console.log(error)
      setErrorMsg(error.response.data.message);
      setIsPending(false);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col w-full items-center justify-center mt-3"
    >
      <LoginInput
        label="Email"
        inputType="email"
        inputPlaceholder="Email"
        value={email}
        setValue={setEmail}
      />

      <LoginInput
        label="Password"
        inputType="password"
        inputPlaceholder="Password"
        value={password}
        setValue={setPassword}
      />

      <ForgetPasswordLink href={FRONTEND_ROUTES.forget_password_page} />

      {isPending ? <LoginLoadingBtn /> : <LoginSubmitBtn btnText="Login" />}

      <div
        className={`${styles.errorMsgContainer} w-full flex items-center justify-center h-8`}
      >
        <p
          className={`${styles.errorMsg} font-montserrat font-base text-red-600 text-lg`}
        >
          {errorMsg}
        </p>
      </div>
    </form>
  );
}
