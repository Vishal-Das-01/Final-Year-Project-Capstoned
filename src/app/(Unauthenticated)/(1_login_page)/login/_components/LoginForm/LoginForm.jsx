"use client";
import { useState } from "react";
import ForgetPasswordLink from "../ForgetPasswordLink/ForgetPasswordLink";
import LoginInput from "../LoginInput/LoginInput";
import LoginSubmitBtn from "../LoginSubmitBtn/LoginSubmitBtn";
import { FRONTEND_ROUTES } from "@/utils/routes/frontend_routes";
import { api } from "@/utils/helpers/axios";
import { BACKEND_ROUTES } from "@/utils/routes/backend_routes";
import LoginLoadingBtn from "../LoginLoadingBtn/LoginLoadingBtn";

export default function LoginForm() {
  const [isPending, setIsPending] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setIsPending(true);

      const response = await api.post(BACKEND_ROUTES.login, {
        email: email,
        password: password,
      });
      if (response.status === 200) {
        console.log(response.data);
        setIsPending(false);
      }
    } catch (error) {
      console.log(error);
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

      {isPending? <LoginLoadingBtn/>: <LoginSubmitBtn btnText="Login" />}

    </form>
  );
}
